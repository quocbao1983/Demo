

# Tazagroup

# CLI Libs Shared 
## Angular
npx nx g @nrwl/angular:guard  auth/guards/auth --project=shared

npx nx g @nrwl/angular:guard  auth/guards/admin --project=shared

npx nx g @nrwl/angular:guard  auth/guards/guest --project=shared

npx nx g @nrwl/angular:service auth/auth --project=shared

npx nx g @nrwl/angular:service admin/admin-baihoc --project=dtv2-shell

npx nx g @nrwl/angular:interceptor auth/auth --project=shared

npx nx g @nrwl/angular:component dangky --project=shared

npx nx g @nrwl/angular:component datlaimatkhau --project=shared

npx nx g @nrwl/angular:component dangnhap --project=shared

npx nx g @nrwl/angular:service dangnhap/dangnhap --project=shared

npx nx g @nrwl/angular:component quenmatkhau --project=shared

## Nestjs

npx nx g @nrwl/workspace:library datatype --project=shared

npx nx g @nrwl/nest:library api/auth --controller --service

npx nx g @nrwl/nest:module api/auth --project=shared

npx nx g @nrwl/nest:controller api/auth --project=shared

npx nx g @nrwl/nest:service api/auth --project=shared

npx nx g @nrwl/nest:guard api/jwt-auth --project=shared

npx nx g @nrwl/nest:class api/auth/jwt.strategy --project=shared

npx nx g @nrwl/nest:class api/auth/auth.dto --project=shared

npx nx g @nrwl/nest:decorator api/common/decorators/auth-user --project=shared

npx nx g @nrwl/nest:module api/prisma --project=shared

npx nx g @nrwl/nest:service api/prisma --project=shared

npx nx g @nrwl/nest:module api/users --project=shared

npx nx g @nrwl/nest:controller api/users --project=shared

npx nx g @nrwl/nest:service api/users --project=shared

npx nx g @nrwl/nest:class api/users/user.dto --project=shared

## CLI Libs daotaov2 
npx nx serve apidaotaov2

npx nx g @nrwl/nest:library dtv2/api --controller --service

npx nx g @nrwl/nest:application apidaotaov2

npx nx g @nrwl/nest:library dtv2/api/tailieunguon --controller --service




# CLI HRM APP
## Angular
npx nx g @angular/material:ng-add --project=hrm

npx nx generate @nrwl/angular:setup-tailwind hrm

npx nx g @nrwl/angular:application hrm

npx nx g @nrwl/angular:library libhrm/site

npx nx g @nrwl/angular:module libhrm/site/quanlynhansu --project=libhrm-site

npx nx g @nrwl/angular:component libhrm/site/quanlynhansu/detailnhanvien --project=libhrm-site

npx nx g @nrwl/angular:class libhrm/site/quanlynhansu/user.type --project=libhrm-site

## Nestjs
npx nx g @nrwl/nest:application apihrm

npx nx g @nrwl/nest:library libhrm/api

npx nx g @nrwl/workspace:library datatype --project=shared

npx nx g @nrwl/nest:library api/auth --controller --service

npx nx g @nrwl/nest:module api/auth --project=shared

npx nx g @nrwl/nest:controller api/auth --project=shared

npx nx g @nrwl/nest:service api/auth --project=shared

npx nx g @nrwl/nest:guard api/jwt-auth --project=shared

npx nx g @nrwl/nest:class api/auth/jwt.strategy --project=shared

npx nx g @nrwl/nest:class api/auth/auth.dto --project=shared

npx nx g @nrwl/nest:decorator api/common/decorators/auth-user --project=shared

npx nx g @nrwl/nest:module api/prisma --project=shared

npx nx g @nrwl/nest:service api/prisma --project=shared

npx nx g @nrwl/nest:module api/users --project=shared

npx nx g @nrwl/nest:controller api/users --project=shared

npx nx g @nrwl/nest:service api/users --project=shared

npx nx g @nrwl/nest:class api/users/user.dto --project=shared




## Run Remote
"start": "node dist/main.js",


## Git CLI
git remote prune origin "Đồng Bộ Nhánh Trên máy Chủ"
git push origin --delete  xóa nhánh remote
git branch -D xóa nhánh local
## Workspace CLI
npx nx g @nrwl/workspace:remove hrm
npx nx run-many --target=serve --projects=apihrm,daotaov2 --parallel





    npx nx g @nrwl/workspace:remove apihrm
    npx nx g @nrwl/workspace:remove apitimona
    npx nx g @nrwl/workspace:remove apiwheel


git branch gh-pages
git checkout gh-pages
git push origin gh-pages
npx ng add angular-cli-ghpages
npx ng deploy --base-href=https://quocbao1983.github.io/demo/
npx ng build --prod --base-href https://quocbao1983.github.io/demo/
npx ng add angular-cli-ghpages --project site
npx ngh --dir=dist/apps/site  --no-silent