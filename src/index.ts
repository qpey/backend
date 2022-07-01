const fs = require('fs');
const {join} = require('path');
const http = require('http');

const path = join(__dirname,'..', 'README.md');

const server = http.createServer((req: any,res: any)=>{
  if(req.url === '/file'){
    fs.createReadStream(path).pipe(res)
  }
})
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))