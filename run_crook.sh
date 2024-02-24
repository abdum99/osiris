#!/bin/sh

echo "starting backend"
# Start backend
tmux new-session -d -s prod_crook -c ./crook/back "npm run start"
echo "started backend"
tmux ls

echo "starting frontend"
# start frontend
tmux split-window -t prod_crook -h -c ./crook/front "sudo serve -s dist -p 80"
echo "started frontend"
tmux ls

echo "Osiris running at abdu.live"
