
start=$(date +%s)

pnpm install --frozen-lockfile
rm -rf docs/
mkdir docs
pnpm run build:pages
cp -R dist/* docs
git add . 
git commit -m 'rebuild to publish' 
git push

end=$(date +%s)
take=$(( end - start ))
echo 完成编译和发布, 耗时 ${take} 秒.
