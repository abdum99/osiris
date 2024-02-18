ENVIRONMENT="DEV"

# to be replicated for PROD
DEV_TMUX_SESS="dev_crook"
DEV_BACK_COMMAND:="npm run dev"
DEV_FRONT_COMMAND:="npm run dev --dev -- --host"

.PHONY: dev prod

dev:
# BACKEND
	tmux new-session -d -s $(DEV_TMUX_SESS) -c $(CROOK_DIR)/back $(DEV_BACK_COMMAND)
	tmux split-window -t $(DEV_TMUX_SESS) -h -c $(CROOK_DIR)/front $(DEV_FRONT_COMMAND)

prod:
	echo "TODO"
