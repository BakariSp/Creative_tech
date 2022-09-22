from art import *
str = "Linghang Cai"
texts=[]
i=1
# tprint(str,font="Alpha")
Art=text2art(str,font="Alpha")
while i<5:
    fonts="isometric{num}".format(num=i)
    text=text2art(str,font=fonts)
    texts.append(text)
    i+=1
print(Art)
for t in texts:
    print(t)

# Response=tsave(str,filename="test.txt")