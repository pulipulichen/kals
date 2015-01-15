# INFORMATION
#
# 1. cp root_update_kals.sh ~/
# 2. chmod 700 root_update_kals.sh
# 3. Modify KALS_PATH and BRANCH
# 4. ~/root_update_kals.sh

KALS_PATH=/var/www/moodle/kals
BRANCH=kals/master

chmod 700 "$KALS_PATH"/git-scripts/*.sh
"$KALS_PATH"/git-scripts/update_kals.sh
