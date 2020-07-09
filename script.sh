#!/bin/bash
npm run build
scp -r build/* root@zcode.id:/var/www/credit.zcode.id

