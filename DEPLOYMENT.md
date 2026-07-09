# VPS telepítés — prepper-shop-engine

## Áttekintés

| Szolgáltatás | Belső port | Nginx (példa domain) |
|---|---|---|
| site-1 | 3000 | shop1.example.com |
| site-2 | 3001 | shop2.example.com |
| site-3 | 3002 | shop3.example.com |
| site-4 | 3003 | shop4.example.com |
| API | 4000 | csak belső (Docker hálózat) |

A site-ok az API-t a `http://api:4000` címen érik el Docker Compose alatt. Az nginx csak a 3000–3003 portokat proxyzza kifelé.

---

## 1. Előfeltételek

```bash
sudo apt update
sudo apt install -y git nginx docker.io docker-compose-plugin certbot python3-certbot-nginx
sudo usermod -aG docker $USER
```

Jelentkezz ki és vissza, hogy a docker csoport érvényesüljön.

---

## 2. Projekt telepítése

```bash
cd /opt
sudo git clone <repo-url> prepper-shop-engine
sudo chown -R $USER:$USER prepper-shop-engine
cd prepper-shop-engine
```

### Adatbázis

```bash
sqlite3 shared-core/data/products.sqlite < shared-core/data/init.sql
```

### Képek (opcionális)

```bash
npm install
npm run process-images
```

---

## 3. Szolgáltatások indítása

```bash
docker compose up -d --build
```

Ellenőrzés:

```bash
curl http://127.0.0.1:3000
curl http://127.0.0.1:3001
curl http://127.0.0.1:3002
curl http://127.0.0.1:3003
curl http://127.0.0.1:4000/health
```

---

## 4. Nginx reverse proxy

Hozd létre a konfigurációt:

```bash
sudo nano /etc/nginx/sites-available/prepper-shop
```

```nginx
upstream site_1 {
    server 127.0.0.1:3000;
}

upstream site_2 {
    server 127.0.0.1:3001;
}

upstream site_3 {
    server 127.0.0.1:3002;
}

upstream site_4 {
    server 127.0.0.1:3003;
}

server {
    listen 80;
    server_name shop1.example.com;

    location / {
        proxy_pass http://site_1;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name shop2.example.com;

    location / {
        proxy_pass http://site_2;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name shop3.example.com;

    location / {
        proxy_pass http://site_3;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

server {
    listen 80;
    server_name shop4.example.com;

    location / {
        proxy_pass http://site_4;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Aktiválás:

```bash
sudo ln -s /etc/nginx/sites-available/prepper-shop /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Cseréld ki a `shop1.example.com` … `shop4.example.com` domaineket a saját domainjeidre.

---

## 5. SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d shop1.example.com -d shop2.example.com -d shop3.example.com -d shop4.example.com
```

---

## 6. Production build (Docker nélkül)

Ha PM2-vel futtatod a site-okat buildelt verzióban:

```bash
npm install
npm run build-all
npm run start:api
```

Minden site külön PM2 processben:

```bash
npm run start -w @prepper-shop/site-1   # port 3000
npm run start -w @prepper-shop/site-2   # port 3001
npm run start -w @prepper-shop/site-3   # port 3002
npm run start -w @prepper-shop/site-4   # port 3003
```

PM2 esetén állítsd be:

```bash
export API_URL=http://127.0.0.1:4000
export PRODUCTS_DB_PATH=/opt/prepper-shop-engine/shared-core/data/products.sqlite
```

---

## 7. Frissítés

```bash
cd /opt/prepper-shop-engine
git pull
docker compose up -d --build
```

---

## 8. Hibakeresés

| Probléma | Ellenőrzés |
|---|---|
| 502 Bad Gateway | `docker compose ps` — fut-e a site konténer? |
| Üres terméklista | Létezik-e `shared-core/data/products.sqlite`? |
| API hiba | `curl http://127.0.0.1:4000/health` |
| Nginx hiba | `sudo nginx -t` és `/var/log/nginx/error.log` |
