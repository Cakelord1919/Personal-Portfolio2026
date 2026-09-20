import fs from 'node:fs';import path from 'node:path';
const analyticsId=JSON.parse(fs.readFileSync('content/site.json','utf8')).analyticsId;
const unlisted=JSON.parse(fs.readFileSync('content/site.json','utf8')).projects.filter(project=>project.unlisted);
let count=0;function visit(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,f.name);if(f.isDirectory()){visit(file);continue;}if(!f.name.endsWith('.html'))continue;const html=fs.readFileSync(file,'utf8');for(const [,link]of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|#|mailto:)/.test(link))continue;const dest=path.resolve(path.dirname(file),link.split(/[?#]/)[0]);if(!fs.existsSync(dest))throw Error(`${file}: missing ${link}`);}if(!html.includes('<h1')||!html.includes('name="description"'))throw Error('Missing page metadata: '+file);if(analyticsId&&!html.includes(`gtag('config','${analyticsId}')`))throw Error('Missing analytics tag: '+file);count++;}}visit('dist');console.log(`Verified ${count} HTML pages, analytics tags, and local asset/link targets.`);
const home=fs.readFileSync('dist/index.html','utf8');
const analyticsPage=fs.readFileSync('dist/analytics/index.html','utf8');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
for(const project of unlisted){const route=`projects/${project.slug}/`;const detail=fs.readFileSync(`dist/${route}index.html`,'utf8');if(home.includes(`href="${route}"`)||sitemap.includes(route))throw Error(`Unlisted project exposed publicly: ${project.slug}`);if(!analyticsPage.includes(`href="../${route}"`)||!detail.includes('content="noindex,nofollow,noarchive"'))throw Error(`Unlisted project missing private link or noindex: ${project.slug}`);}

