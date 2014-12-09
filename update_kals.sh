BRANCH=pudding
KALS_PATH=/opt/lampp/htdocs/kals

cd $KALS_PATH
git --git-dir=/opt/lampp/htdocs/kals/.git clean -f -d
git --git-dir=/opt/lampp/htdocs/kals/.git reset --hard origin/$BRANCH
git --git-dir=/opt/lampp/htdocs/kals/.git pull --rebase --force kals

git --git-dir=/opt/lampp/htdocs/kals/.git merge origin/$BRANCH --no-commit

mv $KALS_PATH/system/application/config/kals_cache_package.php $KALS_PATH/system/application/config/kals_cache_package.old.php
mv $KALS_PATH/system/application/config/kals_cache_package_enable.php $KALS_PATH/system/application/config/kals_cache_package.php