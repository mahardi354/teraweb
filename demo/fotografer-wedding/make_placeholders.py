# Membuat placeholder WebP di assets/. Ganti file di folder ini dengan foto asli (nama sama) -> halaman tidak perlu diubah.
import os,math
from PIL import Image,ImageDraw,ImageFont
os.makedirs("assets",exist_ok=True)
L=[("hero",1800,1200,"FOTO UTAMA"),("intro",1000,1250,"POTRET PENGANTIN"),("cta",1600,900,"SILUET SENJA"),("tim",1000,1250,"TIM BEKERJA"),
("ph-tentang",1800,900,"HEADER TENTANG"),("ph-portofolio",1800,900,"HEADER PORTOFOLIO"),("ph-kontak",1800,900,"HEADER KONTAK")]
for i,k in enumerate(["Prewedding","Detail","Resepsi","Detail","Resepsi","Detail","Prewedding","Resepsi","Akad","Elopement","Akad","Elopement"],1):
    L.append((f"g{i:02d}",1000,1428 if i in(1,3,4,7,10) else 1000,k.upper()))
TOP=[(28,22,32),(48,32,44),(40,26,36)];MID=[(140,75,79),(176,110,92),(120,70,90)];BOT=[(216,192,140),(232,205,160),(200,170,130)]
def mix(a,b,t):return tuple(int(a[j]+(b[j]-a[j])*t) for j in range(3))
try:F=lambda s:ImageFont.truetype("DejaVuSans.ttf",s)
except Exception:F=lambda s:ImageFont.load_default(size=s)
for n,(name,w,h,lb) in enumerate(L):
    v=n%3;im=Image.new("RGB",(w,h));px=im.load();d=ImageDraw.Draw(im)
    for y in range(h):
        t=y/h;c=mix(TOP[v],MID[v],t/.6) if t<.6 else mix(MID[v],BOT[v],(t-.6)/.4)
        d.line([(0,y),(w,y)],fill=c)
    sx,sy,r=w*(.3+.4*((n*37)%10)/10),h*.62,min(w,h)*.09
    for k in range(18,0,-1):d.ellipse([sx-r*k/3,sy-r*k/3,sx+r*k/3,sy+r*k/3],fill=mix(im.getpixel((int(sx),int(sy))),(255,236,200),.04*(19-k)/2)) if False else None
    g=Image.new("RGB",(w,h),(0,0,0));gd=ImageDraw.Draw(g)
    for k in range(10,0,-1):gd.ellipse([sx-r*k*.9,sy-r*k*.9,sx+r*k*.9,sy+r*k*.9],fill=(int(30*(11-k)/2),int(24*(11-k)/2),int(14*(11-k)/2)))
    im=Image.blend(im,Image.composite(Image.new("RGB",(w,h),(255,226,170)),im,g.convert("L").point(lambda p:min(255,p*2))),.55);d=ImageDraw.Draw(im)
    d.ellipse([sx-r,sy-r,sx+r,sy+r],fill=(255,240,214))
    d.polygon([(0,h*.82),(w*.3,h*.74),(w*.62,h*.8),(w,h*.72),(w,h),(0,h)],fill=(33,27,36))
    s=max(22,w//34);t1=f"{lb}";t2=f"{w}×{h} · placeholder";fw=F(s);fs=F(int(s*.62))
    d.text((w/2,h*.46),t1,font=fw,fill=(255,247,235),anchor="mm");d.text((w/2,h*.46+s*1.4),t2,font=fs,fill=(240,225,205),anchor="mm")
    im.save(f"assets/{name}.webp","WEBP",quality=78,method=6)
print(len(L),"file")
