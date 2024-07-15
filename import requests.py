import requests
import ast

URL="https://api.hypixel.net/v2/skyblock/bazaar"

url2="https://api.hypixel.net/v2/resources/skyblock/items"
s = requests.get(URL).json()
s2=requests.get(url2).json()
minioncraft=open("minioncraft.txt", "r").read()
minioncraft=ast.literal_eval(minioncraft)
itemtotal={}
items=[]
buyprices=[]
sellprices=[]
t={}
for i in s["products"]:
    items.append(i)
    sellprices.append(s["products"][i]['quick_status']['sellPrice'])
    buyprices.append(s["products"][i]['quick_status']['buyPrice'])
for i in s2.get('items'):
    t[i.get("name")]=i.get("id")
for i in range(len(buyprices)):
    #print(f'Item:{items[i]}, buy price: {buyprices[i]}, sell price: {sellprices[i]}')
    #itemtotal.append((items[i],buyprices[i],sellprices[i]))
    itemtotal[items[i]]=(buyprices[i],sellprices[i])
for i in minioncraft:
    cost=0
    
    
        
    try:
        x1=itemtotal.get(t.get(i[3]))[0]
        x2=int(i[2])
        cost=round(x1*x2)
        
        
       
        print(f'{i[0]} {i[1]} for {i[2]} {i[3]}   {cost} coins in total ({round(itemtotal.get(t.get(i[3]))[0])}*{round(int(i[2]))})')
        
    except:
        pass
    
    
    
    


    
