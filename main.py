
try:
    import requests
    import ast
except:
    print('You dont have required libraries. Please install requests library')
BazaarUrl="https://api.hypixel.net/v2/skyblock/bazaar"
SkyblockItemsUrl="https://api.hypixel.net/v2/resources/skyblock/items"


itemsList={}

BazaarData = requests.get(BazaarUrl).json()
SbItemsData=requests.get(SkyblockItemsUrl).json()
minioncraft=open("minioncraftV2.txt", "r").read()
minioncraft=ast.literal_eval(minioncraft)


for i in SbItemsData.get('items'):
    itemsList[i.get("name")]=i.get("id")




def GetBazaarData(data):
    itemtotal={}
    i=0
    for ii in data["products"]:
        #items.append(ii)
        #sellprices.append(BazaarData["products"][ii]['quick_status']['sellPrice'])
        #buyprices.append(BazaarData["products"][ii]['quick_status']['buyPrice'])
        
        x1=data["products"][ii]['quick_status']['buyPrice']
        x2=data["products"][ii]['quick_status']['sellPrice']
        itemtotal[ii]=(x1,x2)
        i+=1
    return itemtotal

Bazaar=GetBazaarData()
for i in minioncraft:
    print(i)
    #cost=0            
    #x1=Bazaar.get(itemsList.get(i[3]))[0]
    #x2=int(i[2])
    #cost=round(x1*x2)     
 
