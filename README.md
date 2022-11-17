# bleAdapter
Adapter BLE for Cassia Router

## DOCKER
docker-compose

## step
change ip gateway on docker-compose env
```
i.e 192.168.40.1
```
connect to device via maccaddres

url/api/connect/:macAddress/:chip
```
i.e:
http://localhost:3020/api/connect/C0:00:5B:D1:AA:BC/0
```
send command to get real data
url/api/write/:macAddress/:handle/:value
```
i.e:
http://localhost:3020/api/write/C0:00:5B:D1:AA:BC/39/aa17e8000000001b
```
## list command 
```
https://www.notion.so/xflash/Viatom-dede77b0aea6461fa21c94d00e324662+
```
