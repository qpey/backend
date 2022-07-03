import fs from 'fs';
import path from 'path';
import http from 'http';

const filePath = path.join(__dirname,'..', 'README.md');

const server = http.createServer((req: any,res: any)=>{
  if(req.url === '/file'){
    fs.createReadStream(filePath).pipe(res)
  }
})
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))