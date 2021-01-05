@echo off

#backend
cd ./api
call pm2 --name skauttrebic-backend-batch start npm -- start

#frontend
cd ../client
echo %cd%
call pm2 --name skauttrebic-frontend-batch start npm -- start