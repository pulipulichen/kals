BRANCH=master
KALS_PATH=/opt/lampp/htdocs/kals

cd $KALS_PATH
git --git-dir=$KALS_PATH/.git clean -f -d
git --git-dir=$KALS_PATH/.git reset --hard origin/$BRANCH
git --git-dir=$KALS_PATH/.git pull --rebase --force kals

git --git-dir=$KALS_PATH/.git merge origin/$BRANCH --no-commit

mv $KALS_PATH/system/application/config/kals_cache_package.php $KALS_PATH/system/application/config/kals_cache_package.old.php
mv $KALS_PATH/system/application/config/kals_cache_package_enable.php $KALS_PATH/system/application/config/kals_cache_package.php