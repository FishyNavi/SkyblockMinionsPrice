########Library check######

try:
    import requests
    import ast
except:
    print('You dont have required libraries. Please install requests library')

#######Variables#######

BazaarUrl="https://api.hypixel.net/v2/skyblock/bazaar"
SkyblockItemsUrl="https://api.hypixel.net/v2/resources/skyblock/items"
itemtotal={}
items=[]
buyprices=[]
sellprices=[]
t={}
minions={}


######Requests#######

BazaarData = requests.get(BazaarUrl).json()
SbItemsData=requests.get(SkyblockItemsUrl).json()
minioncraft=open("minioncraft.txt", "r").read()
minioncraft=ast.literal_eval(minioncraft)

######Data analysing#######


#Getting items buyprice and sellprice from bazaar

for i in BazaarData["products"]:
    items.append(i)
    sellprices.append(BazaarData["products"][i]['quick_status']['sellPrice'])
    buyprices.append(BazaarData["products"][i]['quick_status']['buyPrice'])


#Getting all items names and ids

for i in SbItemsData.get('items'):
    t[i.get("name")]=i.get("id")
    


#Converting lists into dictionary

for i in range(len(buyprices)):
    #print(f'Item:{items[i]}, buy price: {buyprices[i]}, sell price: {sellprices[i]}')
    #itemtotal.append((items[i],buyprices[i],sellprices[i]))
    itemtotal[items[i]]=(buyprices[i],sellprices[i])


#Calculating all minions price and printing them
for i in minioncraft:
    try:

        cost=0            
        x1=itemtotal.get(t.get(i[3]))[0]
        x2=int(i[2])
        cost=round(x1*x2)   

        if i[0] not in minions:

            minions.update({i[0]:[{i[1]:(i[2],i[3])}]}) 

        else:         

            minions[i[0]].append({i[1]:(i[2],i[3])}) 
            
    except:    
        print("Cactust minion bug")
        
        #print(f'{i[0]} {i[1]} for {i[2]} {i[3]}   {cost} coins in total ({round(itemtotal.get(t.get(i[3]))[0])}*{round(int(i[2]))})')
        
f=open("minioncraftV2.txt","w")
f.write(str(minions))    
print(minions)
####################For now it just shows you all the minions and their prices
