#!/bin/sh

npx concurrently \
  --kill-others-on-fail \
  --prefix "[{name}]" \
  --names "prettier,lint,typecheck" \
  --prefix-colors "bgRed.bold.white,bgGreen.bold.white,bgBlue.bold.white,bgMagenta.bold.white" \
    "npm run prettier:check --loglevel silent" \
    "npm run lint" \