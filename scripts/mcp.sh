#!/usr/bin/env bash
# MCP + Figma + dev server: single entry point.
# Usage: ./scripts/mcp.sh <action> <target>
#   start figma   Chrome + dev server + open Figma
#   start chrome  Chrome only (remote debugging for MCP)
#   stop figma    Stop Chrome and dev server from last 'start figma'
#   stop chrome   Stop only Chrome (from last start)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PID_FILE="$PROJECT_ROOT/.mcp-run.pids"
PROFILE_DIR="${HOME}/.chrome-mcp-profile"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

action="${1:-}"
target="${2:-}"

kill_dev() {
  local pid=$1
  if [[ -z "$pid" ]]; then return; fi
  if ! kill -0 "$pid" 2>/dev/null; then return; fi
  local pgid
  pgid=$(ps -o pgid= -p "$pid" 2>/dev/null | tr -d ' ')
  if [[ -n "$pgid" ]]; then
    kill -TERM -"$pgid" 2>/dev/null && echo "Stopped dev server (process group $pgid)" || true
  else
    kill -TERM "$pid" 2>/dev/null && echo "Stopped dev server (PID $pid)" || true
  fi
}

kill_chrome() {
  local pid=$1
  if [[ -z "$pid" ]]; then return; fi
  if ! kill -0 "$pid" 2>/dev/null; then return; fi
  local pgid
  pgid=$(ps -o pgid= -p "$pid" 2>/dev/null | tr -d ' ')
  if [[ -n "$pgid" ]]; then
    kill -TERM -"$pgid" 2>/dev/null && echo "Stopped Chrome (process group $pgid)" || true
  else
    kill -TERM "$pid" 2>/dev/null && echo "Stopped Chrome (PID $pid)" || true
  fi
}

# Return 0 if PID is set and process is running
pid_running() {
  local pid=$1
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

# If PID file exists but both processes are dead, remove stale file
clear_stale_pid_file() {
  if [[ ! -f "$PID_FILE" ]]; then return; fi
  source "$PID_FILE" 2>/dev/null || true
  if ! pid_running "$CHROME_PID" && ! pid_running "$DEV_PID"; then
    rm -f "$PID_FILE"
    echo "Removed stale .mcp-run.pids (processes no longer running)."
  fi
}

case "$action $target" in
  "start figma")
    cd "$PROJECT_ROOT"
    clear_stale_pid_file
    if [[ -f "$PID_FILE" ]]; then
      source "$PID_FILE" 2>/dev/null || true
      if pid_running "$CHROME_PID" || pid_running "$DEV_PID"; then
        echo "Already running (see $PID_FILE). Run: ./scripts/mcp.sh stop figma"
        exit 1
      fi
    fi
    if [[ ! -x "$CHROME" ]]; then
      echo "Chrome not found at $CHROME"
      exit 1
    fi
    "$CHROME" --remote-debugging-port=9222 --user-data-dir="$PROFILE_DIR" "https://www.figma.com" &
    CHROME_PID=$!
    ( npm run dev ) &
    DEV_PID=$!
    echo "CHROME_PID=$CHROME_PID" > "$PID_FILE"
    echo "DEV_PID=$DEV_PID" >> "$PID_FILE"
    echo "Started Chrome (PID $CHROME_PID) and dev server (PID $DEV_PID)."
    echo "To stop: ./scripts/mcp.sh stop figma"
    ;;
  "start chrome")
    cd "$PROJECT_ROOT"
    clear_stale_pid_file
    if [[ -f "$PID_FILE" ]]; then
      source "$PID_FILE" 2>/dev/null || true
      if pid_running "$CHROME_PID"; then
        echo "Chrome already running (PID $CHROME_PID). Run: ./scripts/mcp.sh stop chrome"
        exit 1
      fi
    fi
    if [[ ! -x "$CHROME" ]]; then
      echo "Chrome not found at $CHROME"
      exit 1
    fi
    shift 2
    "$CHROME" --remote-debugging-port=9222 --user-data-dir="$PROFILE_DIR" "$@" &
    NEW_CHROME_PID=$!
    source "$PID_FILE" 2>/dev/null || true
    echo "CHROME_PID=$NEW_CHROME_PID" > "$PID_FILE"
    echo "DEV_PID=${DEV_PID:-}" >> "$PID_FILE"
    echo "Started Chrome (PID $NEW_CHROME_PID)."
    echo "To stop: ./scripts/mcp.sh stop chrome"
    ;;
  "stop figma")
    cd "$PROJECT_ROOT"
    if [[ ! -f "$PID_FILE" ]]; then
      echo "No .mcp-run.pids found. Nothing to stop."
      exit 0
    fi
    source "$PID_FILE" 2>/dev/null || true
    kill_dev "$DEV_PID"
    kill_chrome "$CHROME_PID"
    rm -f "$PID_FILE"
    echo "Done. If Chrome is still open, close the window manually."
    ;;
  "stop chrome")
    cd "$PROJECT_ROOT"
    if [[ ! -f "$PID_FILE" ]]; then
      echo "No .mcp-run.pids found. Nothing to stop."
      exit 0
    fi
    source "$PID_FILE" 2>/dev/null || true
    kill_chrome "$CHROME_PID"
    if [[ -z "$DEV_PID" ]]; then
      rm -f "$PID_FILE"
    else
      echo "CHROME_PID=" > "$PID_FILE"
      echo "DEV_PID=$DEV_PID" >> "$PID_FILE"
    fi
    echo "Done. If Chrome is still open, close the window manually."
    ;;
  *)
    echo "Usage: ./scripts/mcp.sh <action> <target>"
    echo "  start figma   Chrome + dev server + Figma"
    echo "  start chrome  Chrome only (extra args passed to Chrome)"
    echo "  stop figma    Stop Chrome and dev server"
    echo "  stop chrome   Stop only Chrome"
    exit 1
    ;;
esac
