
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

Bazaar=GetBazaarData(BazaarData)
print(minioncraft)

for iii in minioncraft:
    i=0
    for ii in minioncraft.get(iii):
        try:
            
            print(iii,ii,)
            
                
            if ii.get("2")!=None: ####For snow minion tier 1 of which cannot be crafted
                if ii.get("2")[0]=="32":
                    i+=1
                           
            i+=1
            
            cost=0    
            minioncraftitem=ii.get(str(i))[1]       
            x1=Bazaar.get(itemsList.get(minioncraftitem))[0]
            x2=int(ii.get(str(i))[0] )
            cost=round(x1*x2)  
        except:
            print('error')   
 
