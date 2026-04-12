#!/bin/zsh

DB_PATH="server/db/dev.sqlite3"
STOPPED_PATH="$DB_PATH.stopped"

# Ensure the database directory exists
if [[ ! -d "server/db" ]]; then
  echo "❌ Error: server/db directory not found. Please run this from the project root."
  exit 1
fi

case "$1" in
  stop)
    if [[ -f "$DB_PATH" ]]; then
      mv "$DB_PATH" "$STOPPED_PATH"
      echo "🔴 Database STOPPED (renamed to dev.sqlite3.stopped)"
    elif [[ -f "$STOPPED_PATH" ]]; then
      echo "⚠️  Database is already stopped."
    else
      echo "❌ Error: dev.sqlite3 not found."
    fi
    ;;
  start)
    if [[ -f "$STOPPED_PATH" ]]; then
      mv "$STOPPED_PATH" "$DB_PATH"
      echo "🟢 Database STARTED (restored to dev.sqlite3)"
    elif [[ -f "$DB_PATH" ]]; then
      echo "⚠️  Database is already active."
    else
      echo "❌ Error: No stopped database found."
    fi
    ;;
  status)
    if [[ -f "$DB_PATH" ]]; then
      echo "🟢 Status: STARTED"
    elif [[ -f "$STOPPED_PATH" ]]; then
      echo "🔴 Status: STOPPED"
    else
      echo "❓ Status: Database file not found."
    fi
    ;;
  *)
    echo "Usage: ./db-rc.sh {stop|start|status}"
    exit 1
    ;;
esac
