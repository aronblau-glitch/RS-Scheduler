#!/usr/bin/env python3
"""Generate print-and-play card sheets for Shas Deal (US Letter, 3x3 cards per page).
Usage: python3 build_cards.py  -> writes cards.html next to this script."""
import html, os

COL = {"Green":"#3a9a4a","Blue":"#3a6fd0","Pink":"#e07aa8","Orange":"#e8872a",
       "Red":"#cc3a3a","Purple":"#8a55b8","Gold":"#c9a227","Grey":"#8a8f98"}
SETS = {  # color: (set name, [cards], rent list)
 "Green": ("Zeraim", ["Berakhot","Peah","Shevi'it"], [1,2,4]),
 "Blue": ("Moed", ["Shabbat","Eruvin","Pesachim","Sukkah"], [1,2,3,5]),
 "Pink": ("Nashim", ["Yevamot","Ketubot","Gittin"], [1,2,4]),
 "Orange": ("Nezikin", ["Bava Kamma","Bava Metzia","Bava Batra","Sanhedrin"], [1,3,4,6]),
 "Red": ("Kodashim", ["Zevachim","Menachot","Chullin"], [2,3,5]),
 "Purple": ("Tohorot", ["Kelim","Oholot","Parah"], [1,3,5]),
 "Gold": ("Commentators", ["Rashi","Tosafot"], [2,3]),
 "Grey": ("Study Tools", ["Study Hall Table","Reference Shelf"], [1,2]),
}
def val(n): return 1 if n<=2 else (2 if n==3 else 3) if n<4 else 4

cards = []  # dict: name,type,value,text,colors(list),rent(list|None),n
for c,(sn,names,rent) in SETS.items():
    v = {2:1,3:2,4:3}[len(names)]
    for nm in names:
        cards.append(dict(name=nm,type=f"PROPERTY - {sn}",value=v,text="",colors=[c],rent=rent,n=1))
pairs=[("Green","Blue"),("Pink","Orange"),("Red","Purple"),("Gold","Grey"),("Green","Orange"),("Blue","Red")]
for a,b in pairs:
    cards.append(dict(name="Wild Property",type=f"WILD - {SETS[a][0]} / {SETS[b][0]}",value=1,
        text="Move between its two colors at the start of your turn (free).",colors=[a,b],rent=None,n=1))
cards.append(dict(name="Rainbow Wild",type="WILD - any color",value=0,text="Counts as any color. Cannot be banked.",colors=list(COL),rent=None,n=1))
cards.append(dict(name="Rainbow Wild",type="WILD - any color",value=0,text="Counts as any color. Cannot be banked.",colors=list(COL),rent=None,n=1))
# fix: 6 two-color + 2 rainbow = 8 wilds
for v,n in [(1,6),(2,5),(3,3),(4,3),(5,2),(10,1)]:
    cards.append(dict(name=f"{v}",type="MONEY",value=v,text="",colors=["Gold"],rent=None,n=n,money=True))
A=[("Deal Breaker",2,5,"Steal a COMPLETE set from any player."),
 ("Sly Deal",3,3,"Steal 1 property from any player (not from a complete set)."),
 ("Forced Deal",3,3,"Swap 1 of your properties with 1 of another player's (not from complete sets)."),
 ("Debt Collector",3,3,"One player pays you 5."),
 ("Celebration",3,2,"Every player pays you 2."),
 ("Machloket",4,4,"Blocks an action played against you. Attacker may challenge: reveal top cards, higher value wins (max 3 rounds)."),
 ("Draw Two",9,1,"Draw 2 extra cards."),
 ("Double the Rent",2,1,"Play with a Rent card to double it. Uses 2 of your 3 plays."),
 ("Study Hall",3,3,"Add to a COMPLETE set: rent +3. One per set."),
 ("Library",2,4,"Add to a complete set with a Study Hall: rent +4 more. One per set.")]
for nm,n,v,t in A: cards.append(dict(name=nm,type="ACTION",value=v,text=t,colors=["Grey"],rent=None,n=n,action=True))
R=[("Zeraim / Moed","Green","Blue"),("Nashim / Nezikin","Pink","Orange"),("Kodashim / Tohorot","Red","Purple"),("Commentators / Study Tools","Gold","Grey")]
for nm,a,b in R:
    cards.append(dict(name="Rent",type=f"RENT - {nm}",value=1,text="Charge ONE player rent on one of these colors you own.",colors=[a,b],rent=None,n=2))
cards.append(dict(name="Wild Rent",type="RENT - any color",value=1,text="Charge ALL players rent on any one color you own.",colors=list(COL),rent=None,n=4))
T=[("Wild Commentary",3,2,"Play on any set: +1 rent. A Deal Breaker on that set costs the attacker 1 hand card per Commentary."),
 ("Chavruta",2,2,"Pair with another player (they may decline). Share one set each; split rent; shared completed sets count for both."),
 ("Market Swing",2,1,"Every player passes 1 banked card to the left."),
 ("Pop Quiz",1,2,"Target answers a group-chosen question. Right: you steal a property of their choice. Wrong: they pay you 3. Cannot be blocked.")]
for nm,n,v,t in T: cards.append(dict(name=nm,type="TWIST",value=v,text=t,colors=["Purple"],rent=None,n=n,action=True))

daily=[("Double Rent Day","All rent is doubled."),("Open Market","All wild properties count as any color."),
 ("Frozen Bank","Banked cards can't be used to pay this round."),("Generous Day","Pay 1 less when paying rent."),
 ("Quiet Round","No Pop Quiz this round."),("Extra Hand","Everyone draws 3 at the start of their turn."),
 ("Tight Hands","Hand limit is 5 this round."),("Open Hands","Everyone plays with hands face up."),
 ("Rest Day","No rent can be charged this round."),("Trade Day","Forced Deal may swap with anyone, including complete... no: targets need not be named; swap with any player.")]
daily[-1]=("Trade Day","Forced Deal may be played on any player, even if they hold no matching color.")
goals=["Complete a set using at least 1 wild.","Have 3 different sets in progress at once.","Hold 10+ in your bank at the start of your turn.",
 "Win a Machloket challenge.","Collect rent of 6+ in a single action.","Own a set with both a Study Hall and a Library.",
 "Complete a set that includes a Wild Commentary.","Complete a Chavruta set with a partner."]
for nm,t in daily: cards.append(dict(name=nm,type="DAILY PAGE",value=None,text=t,colors=["Gold"],rent=None,n=1,side="daily"))
for g in goals: cards.append(dict(name="Secret Goal",type="SECRET GOAL (half a set)",value=None,text=g,colors=["Purple"],rent=None,n=1,side="goal"))

def band(cols):
    if len(cols)==1: return COL[cols[0]]
    if len(cols)>4: return "linear-gradient(90deg,"+",".join(COL[c] for c in cols)+")"
    k=len(cols); return "linear-gradient(90deg,"+",".join(f"{COL[c]} {i*100//k}% {(i+1)*100//k}%" for i,c in enumerate(cols))+")"

def render(c):
    e=html.escape
    v = "" if not c["value"] else f'<div class="val">{c["value"]}</div>'
    if c.get("money"):
        return f'<div class="card money"><div class="band" style="background:{band(c["colors"])}"></div>{v}<div class="big">{e(c["name"])}</div><div class="type">MONEY</div></div>'
    rent=""
    if c["rent"]:
        rent='<table class="rent"><tr><th>Cards</th>'+"".join(f"<th>{i+1}</th>" for i in range(len(c["rent"])))+'</tr><tr><td>Rent</td>'+"".join(f"<td>{r}</td>" for r in c["rent"])+'</tr></table>'
    return (f'<div class="card"><div class="band" style="background:{band(c["colors"])}"></div>{v}'
            f'<div class="name">{e(c["name"])}</div><div class="type">{e(c["type"])}</div>'
            f'<div class="text">{e(c["text"])}</div>{rent}</div>')

main=[c for c in cards if "side" not in c]
sides=[c for c in cards if "side" in c]
def expand(lst): return [c for c in lst for _ in range(c["n"])]
def pages(lst,title):
    out=[]; items=expand(lst)
    for i in range(0,len(items),9):
        out.append(f'<section class="page"><div class="grid">'+"".join(render(c) for c in items[i:i+9])+'</div></section>')
    return out
back=lambda t,col:'<div class="card back" style="background:'+col+'"><div>SHAS<br>DEAL<small>'+t+'</small></div></div>'
back_page=lambda t,col:'<section class="page"><div class="grid">'+back(t,col)*9+'</div></section>'
total=len(expand(main))
assert total==106,total
body="".join(pages(main,"main"))+"".join(pages(sides,"side"))+back_page("MAIN DECK","#2b3a67")+back_page("SIDE DECKS","#6b2d5c")
css="""
@page{size:letter;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Georgia,serif}
.page{width:8.5in;height:11in;padding:.5in;page-break-after:always}
.grid{display:grid;grid-template-columns:repeat(3,2.5in);grid-template-rows:repeat(3,3.5in)}
.card{width:2.5in;height:3.5in;border:.5pt dashed #777;padding:.12in;position:relative;background:#fffdf6;overflow:hidden}
.band{position:absolute;left:0;right:0;top:0;height:.55in}
.val{position:absolute;left:.1in;top:.08in;width:.4in;height:.4in;border-radius:50%;background:#fff;border:1.5pt solid #222;font-weight:bold;text-align:center;line-height:.37in;font-size:15pt}
.name{margin-top:.5in;text-align:center;font-weight:bold;font-size:14pt;padding-top:.1in}
.type{text-align:center;font-size:7pt;letter-spacing:.5pt;color:#555;margin-top:2pt}
.text{margin:.15in .08in 0;font-size:9.5pt;text-align:center;line-height:1.25}
.rent{position:absolute;bottom:.15in;left:.3in;right:.3in;border-collapse:collapse;font-size:10pt;text-align:center}
.rent td,.rent th{border:1pt solid #444;padding:2pt}.rent th{background:#eee}
.money .big{margin-top:.75in;text-align:center;font-size:54pt;font-weight:bold}.money .type{margin-top:.2in}
.back{display:flex;align-items:center;justify-content:center;color:#fff;text-align:center;font-size:26pt;font-weight:bold;line-height:1.1;letter-spacing:3pt}
.back small{display:block;font-size:8pt;margin-top:10pt;letter-spacing:2pt;font-weight:normal}
"""
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),"cards.html")
open(out,"w").write(f"<!doctype html><meta charset=utf-8><title>Shas Deal cards</title><style>{css}</style>{body}")
print("main deck cards:",total,"| side cards:",len(expand(sides)),"| wrote",out)
