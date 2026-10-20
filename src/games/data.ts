export type Item = { q: string; options: string[]; a: number }
export const carQuiz: Item[] = [
 {q:"Which company makes the 911?",options:["Porsche","Audi","BMW","Mazda"],a:0},
 {q:"Lamborghini is from which country?",options:["Germany","Italy","France","Japan"],a:1},
 {q:"What engine layout is used in a Subaru WRX?",options:["V8","Rotary","Boxer","Inline-6"],a:2},
 {q:"The Nürburgring racetrack is in which country?",options:["Germany","Belgium","Austria","Italy"],a:0},
 {q:"Which car was built on Ford's first moving assembly line?",options:["Mustang","Model T","Thunderbird","Fiesta"],a:1},
 {q:"What does EV stand for?",options:["Engine Velocity","Electric Vehicle","Extra Variant","Efficient Valve"],a:1},
 {q:"Which brand makes the Mustang?",options:["Chevrolet","Dodge","Ford","Tesla"],a:2},
 {q:"Which brand builds the GT-R?",options:["Nissan","Honda","Toyota","Mitsubishi"],a:0},
 {q:"How many cylinders does a V8 engine have?",options:["6","8","10","12"],a:1},
 {q:"The 24 Hours of Le Mans is held in which country?",options:["Spain","UK","France","USA"],a:2},
]
export const guessCar: Item[] = [
 {q:"Japanese roadster launched in 1989 and often called the best-selling two-seat sports car ever.",options:["Mazda MX-5 Miata","Toyota MR2","Honda S2000","Nissan 350Z"],a:0},
 {q:"Rear-engined German coupe first shown in 1964, powered by a flat-six.",options:["BMW M3","Porsche 911","Audi TT","VW Beetle"],a:1},
 {q:"American 'pony car' introduced by Ford in 1964.",options:["Camaro","Challenger","Mustang","Corvette"],a:2},
 {q:"All-wheel-drive Nissan coupe nicknamed 'Godzilla'.",options:["Skyline GT-R","Supra","RX-7","Evo"],a:0},
 {q:"Tiny British icon from 1959 designed by Alec Issigonis.",options:["Morris Minor","Classic Mini","Fiat 500","Austin Healey"],a:1},
 {q:"Toyota's rally-bred hot hatch with a turbocharged three-cylinder engine.",options:["GR Yaris","Corolla Sport","Celica","Starlet"],a:0},
 {q:"Electric roadster built using a Lotus Elise-based chassis.",options:["Model S","Tesla Roadster","Leaf","i3"],a:1},
 {q:"Mid-engine Lamborghini whose name later returned for a hybrid V12 flagship.",options:["Countach","Urus","Gallardo","Diablo"],a:0},
]
export const logoQuiz: Item[] = [
 {q:"Emblem: four interlinked rings in a row.",options:["Olympic Auto","Audi","Subaru","Volvo"],a:1},
 {q:"Emblem: a three-pointed star inside a circle.",options:["Mercedes-Benz","Maserati","Mitsubishi","Citroën"],a:0},
 {q:"Emblem: a black prancing horse on a yellow shield.",options:["Porsche","Ferrari","Ford Mustang","Lotus"],a:1},
 {q:"Emblem: a charging bull on a gold-and-black shield.",options:["Dodge","Lamborghini","Alfa Romeo","Bugatti"],a:1},
 {q:"Emblem: a blue-and-white quartered roundel inside a black ring.",options:["BMW","Skoda","Mini","Opel"],a:0},
 {q:"Emblem: three overlapping ovals forming a stylised 'T'.",options:["Tesla","Toyota","Tata","Tatra"],a:1},
 {q:"Emblem: two stacked upward chevrons.",options:["Peugeot","Citroën","Kia","Renault"],a:1},
 {q:"Emblem: a blue oval with script lettering.",options:["Ford","Hyundai","Chevrolet","Fiat"],a:0},
]
