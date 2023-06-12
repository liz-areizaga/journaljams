import './Pages.css'
import React, { useState , useEffect, useContext} from 'react';
import NavBar from "../Components/NewNavbar/Navbar";
import {main} from '../pages_2/SpotifyNLP.js';
import Modal from 'react-modal';
import { Box, Button, TextField, InputLabel, Typography, List, ListItemButton, ListItemText, ListItem } from '@mui/material';
import { UserContext } from "../contexts/user.context";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { shuffle } from 'lodash'

const Neutral = [{"track_number": "Unsteady", "track_name": "X Ambassadors", "track_url": "https://open.spotify.com/track/7lGKEWMXVWWTt3X71Bv44I"}, {"track_number": "Slow Motion", "track_name": "Trey Songz", "track_url": "https://open.spotify.com/track/4NYwy0R3NdvORX2B6OZXBT"}, {"track_number": "I Fall Apart", "track_name": "Post Malone", "track_url": "https://open.spotify.com/track/75ZvA4QfFiZvzhj2xkaWAh"}, {"track_number": "I Don’t Wanna Live Forever (Fifty Shades Darker)", "track_name": "ZAYN", "track_url": "https://open.spotify.com/track/6yIdwnpDHufLWgQcveTPMk"}, {"track_number": "Last Friday Night (T.G.I.F.)", "track_name": "Katy Perry", "track_url": "https://open.spotify.com/track/3avYqdwHKEq8beXbeWCKqJ"}, {"track_number": "Juju on That Beat (TZ Anthem)", "track_name": "Zay Hilfigerrr", "track_url": "https://open.spotify.com/track/1lItf5ZXJc1by9SbPeljFd"}, {"track_number": "Alone", "track_name": "Alan Walker", "track_url": "https://open.spotify.com/track/0JiVRyTJcJnmlwCZ854K4p"}, {"track_number": "Shining (feat. Beyoncé & Jay-Z)", "track_name": "DJ Khaled", "track_url": "https://open.spotify.com/track/7Fa5UNizycSms5jP3SQD3F"}, {"track_number": "A Lie", "track_name": "French Montana", "track_url": "https://open.spotify.com/track/1vVNlXi8gf8tZ7OhnEs4VE"}, {"track_number": "You Don't Know Me", "track_name": "Jax Jones", "track_url": "https://open.spotify.com/track/1rFMYAZxBoAKSzXI54brMu"}, {"track_number": "MIA (feat. Drake)", "track_name": "Bad Bunny", "track_url": "https://open.spotify.com/track/116H0KvKr2Zl4RPuVBruDO"}, {"track_number": "DUELE EL CORAZON (feat. Wisin)", "track_name": "Enrique Iglesias", "track_url": "https://open.spotify.com/track/6YZdkObH88npeKrrkb8Ggf"}, {"track_number": "Holy Grail", "track_name": "JAY-Z", "track_url": "https://open.spotify.com/track/1olNHIIVl4EVwIEPGYIR7G"}, {"track_number": "Summertime Sadness", "track_name": "Lana Del Rey", "track_url": "https://open.spotify.com/track/1FEiijYPJtyswChfcpv3p0"}, {"track_number": "Better", "track_name": "Khalid", "track_url": "https://open.spotify.com/track/2OpBganfGk2GVdSlRdxzaX"}, {"track_number": "Exchange", "track_name": "Bryson Tiller", "track_url": "https://open.spotify.com/track/43PuMrRfbyyuz4QpZ3oAwN"}, {"track_number": "One Call Away", "track_name": "Charlie Puth", "track_url": "https://open.spotify.com/track/6vSforRhuzsA0D0SO9fG1S"}, {"track_number": "Rollin (feat. Future & Khalid)", "track_name": "Calvin Harris", "track_url": "https://open.spotify.com/track/0lMbuWUpfTWhEmOKxppEau"}, {"track_number": "DEVASTATED", "track_name": "Joey Bada$$", "track_url": "https://open.spotify.com/track/4ntsD33Pgsgk8rUyZLLiUV"}, {"track_number": "Ivy", "track_name": "Frank Ocean", "track_url": "https://open.spotify.com/track/2ZWlPOoWh0626oTaHrnl2a"}, {"track_number": "Psycho (feat. Ty Dolla $ign)", "track_name": "Post Malone", "track_url": "https://open.spotify.com/track/3swc6WTsr7rl9DqQKQA55C"}, {"track_number": "Kissing Strangers", "track_name": "DNCE", "track_url": "https://open.spotify.com/track/0w2AqrJ9afRXiTgfgW4tLd"}, {"track_number": "Learn To Let Go", "track_name": "Kesha", "track_url": "https://open.spotify.com/track/1g1TeDflB6atAy7HKwrzXu"}, {"track_number": "OMG (feat. Quavo)", "track_name": "Camila Cabello", "track_url": "https://open.spotify.com/track/4xBjsLUSjcx2h7PcRikpQp"}, {"track_number": "Break from Love", "track_name": "Trey Songz", "track_url": "https://open.spotify.com/track/2zQAAj53fCLog8hzBfT1Fs"}, {"track_number": "Me You", "track_name": "Russ", "track_url": "https://open.spotify.com/track/4f1QbCjIAgQwnf7ms9NXWx"}, {"track_number": "I Miss You (feat. Julia Michaels)", "track_name": "Clean Bandit", "track_url": "https://open.spotify.com/track/2xmrfQpmS2iJExTlklLoAL"}, {"track_number": "Crush", "track_name": "Yuna", "track_url": "https://open.spotify.com/track/3Txcx4jhuiTZSvhAL0WaRc"}, {"track_number": "Run Me Dry", "track_name": "Bryson Tiller", "track_url": "https://open.spotify.com/track/5GG3knKdxKWrNboRijxeKF"}, {"track_number": "Millionaire (feat. Nelly)", "track_name": "Cash Cash", "track_url": "https://open.spotify.com/track/3UDXkdQquqCEAJdNAsA1wO"}, {"track_number": "no tears left to cry", "track_name": "Ariana Grande", "track_url": "https://open.spotify.com/track/2qT1uLXPVPzGgFOx4jtEuo"}, {"track_number": "Walk It Talk It", "track_name": "Migos", "track_url": "https://open.spotify.com/track/6n4U3TlzUGhdSFbUUhTvLP"}, {"track_number": "All In My Head (Flex) (feat. Fetty Wap)", "track_name": "Fifth Harmony", "track_url": "https://open.spotify.com/track/7nD9nN3jord9wWcfW3Gkcm"}, {"track_number": "This Feeling (feat. Kelsea Ballerini)", "track_name": "The Chainsmokers", "track_url": "https://open.spotify.com/track/15kQGEy89K8deJcZVFEn0N"}, {"track_number": "Don't Quit (feat. Travis Scott & Jeremih)", "track_name": "DJ Khaled", "track_url": "https://open.spotify.com/track/4vv1KjUzPwrtDbozizSfQc"}, {"track_number": "1, 2, 3 (feat. Jason Derulo & De La Ghetto)", "track_name": "Sofía Reyes", "track_url": "https://open.spotify.com/track/4QtiVmuA88tPQiCOHZuQ5b"}, {"track_number": "Trophies", "track_name": "Young Money", "track_url": "https://open.spotify.com/track/6HfOzLLjsaXsehIFEsrxTk"}, {"track_number": "Wolves", "track_name": "Selena Gomez", "track_url": "https://open.spotify.com/track/0tBbt8CrmxbjRP0pueQkyU"}, {"track_number": "Why", "track_name": "Sabrina Carpenter", "track_url": "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk"}, {"track_number": "Meant to Be (feat. Florida Georgia Line)", "track_name": "Bebe Rexha", "track_url": "https://open.spotify.com/track/4e4fqjx0Izh4svvTef1z7e"}, {"track_number": "All The Time", "track_name": "Jeremih", "track_url": "https://open.spotify.com/track/0USZx50eApN045zIIyjePN"}, {"track_number": "The Monster", "track_name": "Eminem", "track_url": "https://open.spotify.com/track/3u0qM9FSgL3zXi1Vn75b0i"}, {"track_number": "Knew Better / Forever Boy", "track_name": "Ariana Grande", "track_url": "https://open.spotify.com/track/2SUQGI9ztmp0PQd1J8SVHx"}, {"track_number": "The Middle", "track_name": "Zedd", "track_url": "https://open.spotify.com/track/09IStsImFySgyp0pIQdqAc"}, {"track_number": "Dang! (feat. Anderson .Paak)", "track_name": "Mac Miller", "track_url": "https://open.spotify.com/track/5iUQMwxUPdJBFeGkePtM66"}, {"track_number": "Question", "track_name": "Lauv", "track_url": "https://open.spotify.com/track/6mDoM5FGbr1Or5nY9pTnLy"}, {"track_number": "Whole Heart", "track_name": "Gryffin", "track_url": "https://open.spotify.com/track/4Z1t1aMRif8ES212kTN8H2"}, {"track_number": "Hunter", "track_name": "Galantis", "track_url": "https://open.spotify.com/track/1My0Hfu5dTCbYisBk9ZRGr"}, {"track_number": "Always Remember Us This Way", "track_name": "Lady Gaga", "track_url": "https://open.spotify.com/track/2rbDhOo9Fh61Bbu23T2qCk"}, {"track_number": "Sing Me to Sleep", "track_name": "Alan Walker", "track_url": "https://open.spotify.com/track/2Fjz5ZC5BvFdCqcnTZ3ilH"}, {"track_number": "Domino", "track_name": "Jessie J", "track_url": "https://open.spotify.com/track/2fQxE0jVrjNMT9oJAXtSJR"}, {"track_number": "I'm a Mess", "track_name": "Bebe Rexha", "track_url": "https://open.spotify.com/track/04ZTP5KsCypmtCmQg5tH9R"}, {"track_number": "Dance To This (feat. Ariana Grande)", "track_name": "Troye Sivan", "track_url": "https://open.spotify.com/track/17JYzDCW1UTndfURuTydF2"}, {"track_number": "Mi Gente", "track_name": "J Balvin", "track_url": "https://open.spotify.com/track/7COfe3P7KgfwDwIRB8LIDw"}, {"track_number": "IDOL", "track_name": "BTS", "track_url": "https://open.spotify.com/track/03iCbZaM4OkRR4We6wIzvx"}, {"track_number": "Mama Said", "track_name": "Lukas Graham", "track_url": "https://open.spotify.com/track/7675gjlUZzneYiMrQ9Inx8"}, {"track_number": "Faded", "track_name": "Alan Walker", "track_url": "https://open.spotify.com/track/7gHs73wELdeycvS48JfIos"}, {"track_number": "TOOTIMETOOTIMETOOTIME", "track_name": "The 1975", "track_url": "https://open.spotify.com/track/6wvlEKW2qxucJSBXYpMV2P"}, {"track_number": "Famous", "track_name": "Kanye West", "track_url": "https://open.spotify.com/track/19a3JfW8BQwqHWUMbcqSx8"}, {"track_number": "LOVE. FEAT. ZACARI.", "track_name": "Kendrick Lamar", "track_url": "https://open.spotify.com/track/6PGoSes0D9eUDeeAafB2As"}, {"track_number": "7 Years", "track_name": "Lukas Graham", "track_url": "https://open.spotify.com/track/7129iqBafaphfc3WPCGC0L"}, {"track_number": "Broccoli (feat. Lil Yachty)", "track_name": "DRAM", "track_url": "https://open.spotify.com/track/7yyRTcZmCiyzzJlNzGC9Ol"}, {"track_number": "Moves", "track_name": "Big Sean", "track_url": "https://open.spotify.com/track/0Fv5N0cHBsl4bzCbollCAS"}, {"track_number": "Just the Way You Are", "track_name": "Bruno Mars", "track_url": "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ"}, {"track_number": "Strangers", "track_name": "Halsey", "track_url": "https://open.spotify.com/track/11EDhDAVDtGPoSar6ootYA"}, {"track_number": "This One's for You (feat. Zara Larsson) (Official Song UEFA EURO 2016)", "track_name": "David Guetta", "track_url": "https://open.spotify.com/track/46NBoIAHrmR7qcUGCIFEjR"}, {"track_number": "Don’t Matter To Me (with Michael Jackson)", "track_name": "Drake", "track_url": "https://open.spotify.com/track/6G8kHiVZ1jW7vHMPVRNZU0"}, {"track_number": "Complicated (feat. Kiiara)", "track_name": "Dimitri Vegas & Like Mike", "track_url": "https://open.spotify.com/track/1Sl3njkhhz8nrSPZroDQ82"}, {"track_number": "Run Up (feat. PARTYNEXTDOOR & Nicki Minaj)", "track_name": "PARTYNEXTDOOR", "track_url": "https://open.spotify.com/track/7byg7bjrXNpWgfr3aXfwxV"}, {"track_number": "Dark Horse", "track_name": "Katy Perry", "track_url": "https://open.spotify.com/track/5jrdCoLpJSvHHorevXBATy"}, {"track_number": "Electric Love", "track_name": "BØRNS", "track_url": "https://open.spotify.com/track/2GiJYvgVaD2HtM8GqD9EgQ"}, {"track_number": "Really Really", "track_name": "Kevin Gates", "track_url": "https://open.spotify.com/track/10I3CmmwT0BkOVhduDy53o"}, {"track_number": "Get Lucky (Radio Edit) [feat. Pharrell Williams and Nile Rodgers]", "track_name": "Daft Punk", "track_url": "https://open.spotify.com/track/2Foc5Q5nqNiosCNqttzHof"}, {"track_number": "Selfish", "track_name": "PnB Rock", "track_url": "https://open.spotify.com/track/2xbI8Vmyv3TkpTdywpPyNw"}, {"track_number": "Send My Love (To Your New Lover)", "track_name": "Adele", "track_url": "https://open.spotify.com/track/4BHzQ9C00ceJxfG16AlNWb"}, {"track_number": "Saved (feat. E-40)", "track_name": "Ty Dolla $ign", "track_url": "https://open.spotify.com/track/5UPNBWFU2TEf9kauIITfBs"}, {"track_number": "Saved", "track_name": "Khalid", "track_url": "https://open.spotify.com/track/248OFOZef6ShXv6DGgbnxU"}, {"track_number": "Secret Love Song (feat. Jason Derulo)", "track_name": "Little Mix", "track_url": "https://open.spotify.com/track/4JIo8RztBbELr2gWJ5OGK6"}, {"track_number": "My Way", "track_name": "Calvin Harris", "track_url": "https://open.spotify.com/track/1vvNmPOiUuyCbgWmtc6yfm"}, {"track_number": "Nobody Else but You", "track_name": "Trey Songz", "track_url": "https://open.spotify.com/track/1HOUzEsetdIPSpAgRPhZQt"}, {"track_number": "Someone New", "track_name": "Hozier", "track_url": "https://open.spotify.com/track/4yHyWMobcZQAI0ysLkwjUI"}, {"track_number": "Body Like A Back Road", "track_name": "Sam Hunt", "track_url": "https://open.spotify.com/track/7mldq42yDuxiUNn08nvzHO"}, {"track_number": "Too Good", "track_name": "Drake", "track_url": "https://open.spotify.com/track/3BtuIIrQlkujKPuWF2B85z"}, {"track_number": "Mine", "track_name": "Bazzi", "track_url": "https://open.spotify.com/track/7uzmGiiJyRfuViKKK3lVmR"}, {"track_number": "RAF (feat. A$AP Rocky, Playboi Carti, Quavo, Lil Uzi Vert & Frank Ocean)", "track_name": "A$AP Mob", "track_url": "https://open.spotify.com/track/4pdgV8qr9Oytcv6thCdiIZ"}, {"track_number": "Moves Like Jagger", "track_name": "Studio Recording From The Voice Performance - Maroon 5", "track_url": "https://open.spotify.com/track/7pYfyrMNPn3wtoCyqcTVoI"}, {"track_number": "No Role Modelz", "track_name": "J. Cole", "track_url": "https://open.spotify.com/track/62vpWI1CHwFy7tMIcSStl8"}, {"track_number": "Say It", "track_name": "Tory Lanez", "track_url": "https://open.spotify.com/track/2Gyc6e2cLxA5hoX1NOvYnU"}, {"track_number": "Please Don't Go", "track_name": "Joel Adams", "track_url": "https://open.spotify.com/track/3cNjgVBKTJ1SvKhunrCdVy"}, {"track_number": "when the party's over", "track_name": "Billie Eilish", "track_url": "https://open.spotify.com/track/14JzyD6FlBD5z0wV5P07YI"}, {"track_number": "FRIENDS", "track_name": "Marshmello", "track_url": "https://open.spotify.com/track/08bNPGLD8AhKpnnERrAc6G"}, {"track_number": "THat Part", "track_name": "ScHoolboy Q", "track_url": "https://open.spotify.com/track/2yJ9GVCLMmzBBfQAnfzlwr"}, {"track_number": "Castle on the Hill", "track_name": "Ed Sheeran", "track_url": "https://open.spotify.com/track/6PCUP3dWmTjcTtXY02oFdT"}, {"track_number": "Oceans Away", "track_name": "A R I Z O N A", "track_url": "https://open.spotify.com/track/6A8dnC0xkiuWN4BshmTB2I"}, {"track_number": "Cake", "track_name": "Challenge Version - Flo Rida", "track_url": "https://open.spotify.com/track/6t2ubAB4iSYOuIpRAOGd4t"}, {"track_number": "Rise", "track_name": "Katy Perry", "track_url": "https://open.spotify.com/track/1CwNogTShsnsn1C8UhRmYX"}, {"track_number": "Lust For Life (with The Weeknd)", "track_name": "Lana Del Rey", "track_url": "https://open.spotify.com/track/0mt02gJ425Xjm7c3jYkOBn"}, {"track_number": "Chanel", "track_name": "Frank Ocean", "track_url": "https://open.spotify.com/track/6Nle9hKrkL1wQpwNfEkxjh"}, {"track_number": "Let Me Explain", "track_name": "Bryson Tiller", "track_url": "https://open.spotify.com/track/1trZGMI2CGyVT44STkpCoN"}, {"track_number": "Roar", "track_name": "Katy Perry", "track_url": "https://open.spotify.com/track/6F5c58TMEs1byxUstkzVeM"}]
const Joy = [{"track_number": "Lights", "track_name": "Single Version - Ellie Goulding ", "track_url": "https://open.spotify.com/track/7gUpO6td4OOnu0Lf9vhcIV"}, {"track_number": "Easy Love", "track_name": "Lauv ", "track_url": "https://open.spotify.com/track/732Sqj2piYPhdMPENP4axz"}, {"track_number": "1, 2, 3 (feat. Jason Derulo & De La Ghetto)", "track_name": "Sofía Reyes ", "track_url": "https://open.spotify.com/track/4QtiVmuA88tPQiCOHZuQ5b"}, {"track_number": "Naked", "track_name": "DNCE ", "track_url": "https://open.spotify.com/track/1Jajkjm81BVqptjRBoJcAn"}, {"track_number": "Nobody Else but You", "track_name": "Trey Songz ", "track_url": "https://open.spotify.com/track/1HOUzEsetdIPSpAgRPhZQt"}, {"track_number": "Pray For Me (with Kendrick Lamar)", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/77UjLW8j5UAGAGVGhR5oUK"}, {"track_number": "Human", "track_name": "Rag'n'Bone Man ", "track_url": "https://open.spotify.com/track/58zsLZPvfflaiIbNWoA22O"}, {"track_number": "Real Friends", "track_name": "Camila Cabello ", "track_url": "https://open.spotify.com/track/5vnpANH92iEajvGwE2oQ6r"}, {"track_number": "Sucker for Pain (with Wiz Khalifa, Imagine Dragons, Logic & Ty Dolla $ign feat. X Ambassadors)", "track_name": "Lil Wayne ", "track_url": "https://open.spotify.com/track/4dASQiO1Eoo3RJvt74FtXB"}, {"track_number": "Royals", "track_name": "Lorde ", "track_url": "https://open.spotify.com/track/2dLLR6qlu5UJ5gk0dKz0h3"}, {"track_number": "Two High", "track_name": "Moon Taxi ", "track_url": "https://open.spotify.com/track/5huOzlgCK7PsMSG4TFBvKY"}, {"track_number": "DEVASTATED", "track_name": "Joey Bada$$ ", "track_url": "https://open.spotify.com/track/4ntsD33Pgsgk8rUyZLLiUV"}, {"track_number": "Lay Me Down", "track_name": "Sam Smith ", "track_url": "https://open.spotify.com/track/64GRDrL1efgXclrhVCeuA0"}, {"track_number": "Psycho (feat. Ty Dolla $ign)", "track_name": "Post Malone ", "track_url": "https://open.spotify.com/track/3swc6WTsr7rl9DqQKQA55C"}, {"track_number": "Million Reasons", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/7dZ1Odmx9jWIweQSatnRqo"}, {"track_number": "Only You (with Little Mix)", "track_name": "Cheat Codes ", "track_url": "https://open.spotify.com/track/54l9GJGQ1UCFKe2tzt1Vxt"}, {"track_number": "Attention", "track_name": "Charlie Puth ", "track_url": "https://open.spotify.com/track/5cF0dROlMOK5uNZtivgu50"}, {"track_number": "1999", "track_name": "Charli XCX ", "track_url": "https://open.spotify.com/track/05mAIVLkIWc2d1UBYZBCp8"}, {"track_number": "Learn To Let Go", "track_name": "Kesha ", "track_url": "https://open.spotify.com/track/1g1TeDflB6atAy7HKwrzXu"}, {"track_number": "White Iverson", "track_name": "Post Malone ", "track_url": "https://open.spotify.com/track/6eT7xZZlB2mwyzJ2sUKG6w"}, {"track_number": "Exchange", "track_name": "Bryson Tiller ", "track_url": "https://open.spotify.com/track/43PuMrRfbyyuz4QpZ3oAwN"}, {"track_number": "What Do You Mean?", "track_name": "Justin Bieber ", "track_url": "https://open.spotify.com/track/4B0JvthVoAAuygILe3n4Bs"}, {"track_number": "Meant to Be (feat. Florida Georgia Line)", "track_name": "Bebe Rexha ", "track_url": "https://open.spotify.com/track/4e4fqjx0Izh4svvTef1z7e"}, {"track_number": "From Time", "track_name": "Drake ", "track_url": "https://open.spotify.com/track/10VBBaul4zVD0reteuIHM2"}, {"track_number": "iSpy (feat. Lil Yachty)", "track_name": "KYLE ", "track_url": "https://open.spotify.com/track/6xbraxG0bSBOuAr5IUXmtM"}, {"track_number": "Cheerleader", "track_name": "Felix Jaehn Remix Radio Edit - OMI ", "track_url": "https://open.spotify.com/track/7vFoFDWqTX0mHzLfrF1Cfy"}, {"track_number": "Dynamite (feat. Pretty Sister)", "track_name": "Nause ", "track_url": "https://open.spotify.com/track/2Ae5awwKvQpTBKQHr1TYCg"}, {"track_number": "Summer", "track_name": "Calvin Harris ", "track_url": "https://open.spotify.com/track/6YUTL4dYpB9xZO5qExPf05"}, {"track_number": "My Favorite Part", "track_name": "Mac Miller ", "track_url": "https://open.spotify.com/track/66wkCYWlXzSTQAfnsPBptt"}, {"track_number": "Drunk in Love (feat. Jay-Z)", "track_name": "Beyoncé ", "track_url": "https://open.spotify.com/track/6jG2YzhxptolDzLHTGLt7S"}, {"track_number": "Flex (Ooh, Ooh, Ooh)", "track_name": "Rich Homie Quan ", "track_url": "https://open.spotify.com/track/2NVt7fxr5GsqTkGwYXcNTE"}, {"track_number": "LIKE I WOULD", "track_name": "ZAYN ", "track_url": "https://open.spotify.com/track/1zWMf9bVyhY5W3ZORbjNWt"}, {"track_number": "Never Be Alone / Hey There Delilah", "track_name": "Live Medley - Shawn Mendes ", "track_url": "https://open.spotify.com/track/1Q3bb5UXqAWr7Tjuno2xcq"}, {"track_number": "Cold Water (feat. Justin Bieber & MØ)", "track_name": "Major Lazer ", "track_url": "https://open.spotify.com/track/6gFPdkLitG8mpiWKKZ3lgE"}, {"track_number": "Call On Me", "track_name": "Ryan Riback Remix - Starley ", "track_url": "https://open.spotify.com/track/3R8lr1Y1kPgXEbnXkcMMlT"}, {"track_number": "Taki Taki (with Selena Gomez, Ozuna & Cardi B)", "track_name": "DJ Snake ", "track_url": "https://open.spotify.com/track/4w8niZpiMy6qz1mntFA5uM"}, {"track_number": "Jackie Chan", "track_name": "Tiësto ", "track_url": "https://open.spotify.com/track/4kWO6O1BUXcZmaxitpVUwp"}, {"track_number": "RAF (feat. A$AP Rocky, Playboi Carti, Quavo, Lil Uzi Vert & Frank Ocean)", "track_name": "A$AP Mob ", "track_url": "https://open.spotify.com/track/4pdgV8qr9Oytcv6thCdiIZ"}, {"track_number": "Sing Me to Sleep", "track_name": "Alan Walker ", "track_url": "https://open.spotify.com/track/2Fjz5ZC5BvFdCqcnTZ3ilH"}, {"track_number": "Let Her Go", "track_name": "Passenger ", "track_url": "https://open.spotify.com/track/2jyjhRf6DVbMPU5zxagN2h"}, {"track_number": "Who Dat Boy (feat. A$AP Rocky)", "track_name": "Tyler, The Creator ", "track_url": "https://open.spotify.com/track/21yRtB6B8EMounImAfHRCP"}, {"track_number": "The Hills", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/7fBv7CLKzipRk6EC6TWHOB"}, {"track_number": "Yes Indeed", "track_name": "Lil Baby ", "track_url": "https://open.spotify.com/track/6vN77lE9LK6HP2DewaN6HZ"}, {"track_number": "Back To You", "track_name": "From 13 Reasons Why – Season 2 Soundtrack - Selena Gomez ", "track_url": "https://open.spotify.com/track/4hQ6UGyWQIGJmHSo0J88JW"}, {"track_number": "Something New (feat. Ty Dolla $ign)", "track_name": "Wiz Khalifa ", "track_url": "https://open.spotify.com/track/6u8hSdYZxbK5EczDPRIXXf"}, {"track_number": "Say You Won't Let Go", "track_name": "James Arthur ", "track_url": "https://open.spotify.com/track/5uCax9HTNlzGybIStD3vDh"}, {"track_number": "Slow Motion", "track_name": "Trey Songz ", "track_url": "https://open.spotify.com/track/4NYwy0R3NdvORX2B6OZXBT"}, {"track_number": "BEBE", "track_name": "6ix9ine ", "track_url": "https://open.spotify.com/track/7ATATJztoWLcqDAcVVof0C"}, {"track_number": "Winter", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/4V3VshJLUTCIWa77YiAkvM"}, {"track_number": "Obsession (feat. Jon Bellion)", "track_name": "Vice ", "track_url": "https://open.spotify.com/track/5pvVAwQbuFoR7LkcicrKnk"}, {"track_number": "Hide Away", "track_name": "Daya ", "track_url": "https://open.spotify.com/track/4Z3qm2aWGTJuJKnv3EWwyD"}, {"track_number": "Something New", "track_name": "Zendaya ", "track_url": "https://open.spotify.com/track/1z15fhSgN6U2k4gqA1Zu4j"}, {"track_number": "Bitch Better Have My Money", "track_name": "Rihanna ", "track_url": "https://open.spotify.com/track/0NTMtAO2BV4tnGvw9EgBVq"}, {"track_number": "Man's Not Hot", "track_name": "Big Shaq ", "track_url": "https://open.spotify.com/track/6X5OFBbrsHRsyO1zP7udgr"}, {"track_number": "Mercy", "track_name": "Shawn Mendes ", "track_url": "https://open.spotify.com/track/0AS63m1wHv9n4VVRizK6Hc"}, {"track_number": "Playinwitme (feat. Kehlani)", "track_name": "KYLE ", "track_url": "https://open.spotify.com/track/4F1yvJfQ7gJkrcgFJQDjOr"}, {"track_number": "Cake", "track_name": "Challenge Version - Flo Rida ", "track_url": "https://open.spotify.com/track/6t2ubAB4iSYOuIpRAOGd4t"}, {"track_number": "you should see me in a crown", "track_name": "Billie Eilish ", "track_url": "https://open.spotify.com/track/6vsV4D8BM6PioRr1UOx0n2"}, {"track_number": "That's What I Like", "track_name": "Bruno Mars ", "track_url": "https://open.spotify.com/track/0KKkJNfGyhkQ5aFogxQAPU"}, {"track_number": "Fancy", "track_name": "Iggy Azalea ", "track_url": "https://open.spotify.com/track/3W3KtDwAIg3mAruSpnfG3Q"}, {"track_number": "Black Beatles", "track_name": "Rae Sremmurd ", "track_url": "https://open.spotify.com/track/6fujklziTHa8uoM5OQSfIo"}, {"track_number": "Wolves", "track_name": "Selena Gomez ", "track_url": "https://open.spotify.com/track/0tBbt8CrmxbjRP0pueQkyU"}, {"track_number": "Time for That", "track_name": "Kevin Gates ", "track_url": "https://open.spotify.com/track/1gZNqH0rDxD1mXLeul1Qq7"}, {"track_number": "Turn Down for What", "track_name": "DJ Snake ", "track_url": "https://open.spotify.com/track/67awxiNHNyjMXhVgsHuIrs"}, {"track_number": "Shining (feat. Beyoncé & Jay-Z)", "track_name": "DJ Khaled ", "track_url": "https://open.spotify.com/track/7Fa5UNizycSms5jP3SQD3F"}, {"track_number": "Talking Body", "track_name": "Tove Lo ", "track_url": "https://open.spotify.com/track/7cgu4JBW3hq1GwTM1ilkKQ"}, {"track_number": "X (feat. Future)", "track_name": "21 Savage ", "track_url": "https://open.spotify.com/track/6fwdbPMwP1zVStm8FybmkO"}, {"track_number": "Love Lies (with Normani)", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/45Egmo7icyopuzJN0oMEdk"}, {"track_number": "Can't Hold Us (feat. Ray Dalton)", "track_name": "Macklemore & Ryan Lewis ", "track_url": "https://open.spotify.com/track/3bidbhpOYeV4knp8AIu8Xn"}, {"track_number": "Last Friday Night (T.G.I.F.)", "track_name": "Katy Perry ", "track_url": "https://open.spotify.com/track/3avYqdwHKEq8beXbeWCKqJ"}, {"track_number": "Sexy Dirty Love", "track_name": "Demi Lovato ", "track_url": "https://open.spotify.com/track/3Nvb9jMtkIbUgU5JMdAyis"}, {"track_number": "Shallow", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/2VxeLyX666F8uXCJ0dZF8B"}, {"track_number": "YOUTH", "track_name": "Troye Sivan ", "track_url": "https://open.spotify.com/track/1cOyWWUr3oXJIxY0AjJEx9"}, {"track_number": "I Wanna Know (feat. Bea Miller)", "track_name": "NOTD ", "track_url": "https://open.spotify.com/track/18W92Zm1KjLCbUIszOhpkD"}, {"track_number": "Let Me Explain", "track_name": "Bryson Tiller ", "track_url": "https://open.spotify.com/track/1trZGMI2CGyVT44STkpCoN"}, {"track_number": "Raging (feat. Kodaline)", "track_name": "Kygo ", "track_url": "https://open.spotify.com/track/2Vhd5uZB4brKHmM0MNxkZo"}, {"track_number": "Power (feat. Stormzy)", "track_name": "Little Mix ", "track_url": "https://open.spotify.com/track/02gj0J38nzyO9lNi9mzi3A"}, {"track_number": "Sober", "track_name": "Childish Gambino ", "track_url": "https://open.spotify.com/track/6olUplztLFFfU7fMYmFXOP"}, {"track_number": "Animals", "track_name": "Maroon 5 ", "track_url": "https://open.spotify.com/track/13mWClHbl5ZqRhnWlFiJQ9"}, {"track_number": "Black Widow", "track_name": "Iggy Azalea ", "track_url": "https://open.spotify.com/track/7pNC5ZIKtwUK0ReSpM3P9f"}, {"track_number": "Starving", "track_name": "Hailee Steinfeld ", "track_url": "https://open.spotify.com/track/6875MeXyCW0wLyT72Eetmo"}, {"track_number": "Hands To Myself", "track_name": "Selena Gomez ", "track_url": "https://open.spotify.com/track/3CJvmtWw2bJsudbAC5uCQk"}, {"track_number": "High Hopes", "track_name": "Panic! At The Disco ", "track_url": "https://open.spotify.com/track/1rqqCSm0Qe4I9rUvWncaom"}, {"track_number": "We Dem Boyz", "track_name": "Wiz Khalifa ", "track_url": "https://open.spotify.com/track/1ULa3GfdMKs0MfRpm6xVlu"}, {"track_number": "Selfish", "track_name": "PnB Rock ", "track_url": "https://open.spotify.com/track/2xbI8Vmyv3TkpTdywpPyNw"}, {"track_number": "The Monster", "track_name": "Eminem ", "track_url": "https://open.spotify.com/track/3u0qM9FSgL3zXi1Vn75b0i"}, {"track_number": "Why", "track_name": "Sabrina Carpenter ", "track_url": "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk"}, {"track_number": "Diamonds", "track_name": "Rihanna ", "track_url": "https://open.spotify.com/track/4JQSMg83F8qYwSBt5xOXsQ"}, {"track_number": "Adrenaline", "track_name": "Lauv ", "track_url": "https://open.spotify.com/track/4nxMHRNNfrOZWg8NAKXnV8"}, {"track_number": "Let You Down", "track_name": "NF ", "track_url": "https://open.spotify.com/track/52okn5MNA47tk87PeZJLEL"}, {"track_number": "Cool Girl", "track_name": "Tove Lo ", "track_url": "https://open.spotify.com/track/3tJ4y2Zqx6gM9xOAuFfsSF"}, {"track_number": "I Got You", "track_name": "Bebe Rexha ", "track_url": "https://open.spotify.com/track/2jB9QaPJyVdz2Q0Va8rrnU"}, {"track_number": "All In My Head (Flex) (feat. Fetty Wap)", "track_name": "Fifth Harmony ", "track_url": "https://open.spotify.com/track/7nD9nN3jord9wWcfW3Gkcm"}, {"track_number": "Finesse", "track_name": "Remix; feat. Cardi B - Bruno Mars ", "track_url": "https://open.spotify.com/track/3Vo4wInECJQuz9BIBMOu8i"}, {"track_number": "Still Got Time (feat. PARTYNEXTDOOR)", "track_name": "ZAYN ", "track_url": "https://open.spotify.com/track/000xQL6tZNLJzIrtIgxqSl"}, {"track_number": "H.O.L.Y.", "track_name": "Florida Georgia Line ", "track_url": "https://open.spotify.com/track/0BCy325UZyR9z0t0uxwn2N"}, {"track_number": "Let It Go", "track_name": "James Bay ", "track_url": "https://open.spotify.com/track/13HVjjWUZFaWilh2QUJKsP"}, {"track_number": "Georgia", "track_name": "Vance Joy ", "track_url": "https://open.spotify.com/track/6Fha6tXHkL3r9m9nNqQG8p"}, {"track_number": "Earned It (Fifty Shades Of Grey)", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/4frLb7nWtsz2ymBE6k2GRP"}, {"track_number": "Suncity (feat. Empress Of)", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/4AhSkRYioEIfGvCV19peYN"}]
const Sad = [{"track_number": "Amnesia", "track_name": "5 Seconds of Summer ", "track_url": "https://open.spotify.com/track/1JCCdiru7fhstOIF4N7WJC"}, {"track_number": "No Fear", "track_name": "DeJ Loaf ", "track_url": "https://open.spotify.com/track/2H881m3JRA8lpuuwaQL6zy"}, {"track_number": "Clandestino", "track_name": "Shakira ", "track_url": "https://open.spotify.com/track/7DrluKkTviBwCc8AV3VGmf"}, {"track_number": "Playinwitme (feat. Kehlani)", "track_name": "KYLE ", "track_url": "https://open.spotify.com/track/4F1yvJfQ7gJkrcgFJQDjOr"}, {"track_number": "Ghost", "track_name": "Ella Henderson ", "track_url": "https://open.spotify.com/track/4XPWKmy05Rcff6TLHNoNF8"}, {"track_number": "Mi Gente", "track_name": "J Balvin ", "track_url": "https://open.spotify.com/track/7COfe3P7KgfwDwIRB8LIDw"}, {"track_number": "Naked", "track_name": "DNCE ", "track_url": "https://open.spotify.com/track/1Jajkjm81BVqptjRBoJcAn"}, {"track_number": "DEVASTATED", "track_name": "Joey Bada$$ ", "track_url": "https://open.spotify.com/track/4ntsD33Pgsgk8rUyZLLiUV"}, {"track_number": "Jackie Chan", "track_name": "Tiësto ", "track_url": "https://open.spotify.com/track/4kWO6O1BUXcZmaxitpVUwp"}, {"track_number": "Get Lucky (Radio Edit) [feat. Pharrell Williams and Nile Rodgers]", "track_name": "Daft Punk ", "track_url": "https://open.spotify.com/track/2Foc5Q5nqNiosCNqttzHof"}, {"track_number": "Jealous", "track_name": "Labrinth ", "track_url": "https://open.spotify.com/track/4L2K7JKseFCBoHMZEAszW0"}, {"track_number": "Cake", "track_name": "Challenge Version - Flo Rida ", "track_url": "https://open.spotify.com/track/6t2ubAB4iSYOuIpRAOGd4t"}, {"track_number": "Obsession (feat. Jon Bellion)", "track_name": "Vice ", "track_url": "https://open.spotify.com/track/5pvVAwQbuFoR7LkcicrKnk"}, {"track_number": "Rise", "track_name": "Katy Perry ", "track_url": "https://open.spotify.com/track/1CwNogTShsnsn1C8UhRmYX"}, {"track_number": "Privacy", "track_name": "Chris Brown ", "track_url": "https://open.spotify.com/track/5kyd6oKvKmj6mWCaAaHoN4"}, {"track_number": "Finest Hour (feat. Abir)", "track_name": "Cash Cash ", "track_url": "https://open.spotify.com/track/0p0ljM6RxgpGt7wthGqBZa"}, {"track_number": "Mama", "track_name": "Jonas Blue ", "track_url": "https://open.spotify.com/track/47OVNnZJzIkrsEiZ4n187p"}, {"track_number": "Flex (Ooh, Ooh, Ooh)", "track_name": "Rich Homie Quan ", "track_url": "https://open.spotify.com/track/2NVt7fxr5GsqTkGwYXcNTE"}, {"track_number": "Came Here for Love", "track_name": "Sigala ", "track_url": "https://open.spotify.com/track/0mGJTKRIuCOJtiT4YkJHiv"}, {"track_number": "Final Song", "track_name": "MØ ", "track_url": "https://open.spotify.com/track/4qqArAiTPueDxIp7cf87h7"}, {"track_number": "Ciao Adios", "track_name": "Anne-Marie ", "track_url": "https://open.spotify.com/track/01BC4Xj5tfsfV8DLDrma7q"}, {"track_number": "Body", "track_name": "Dreezy ", "track_url": "https://open.spotify.com/track/20s34XSPIiYMGSFDRSs24t"}, {"track_number": "OMG (feat. Quavo)", "track_name": "Camila Cabello ", "track_url": "https://open.spotify.com/track/4xBjsLUSjcx2h7PcRikpQp"}, {"track_number": "Stay Together", "track_name": "Noah Cyrus ", "track_url": "https://open.spotify.com/track/5R4HqXCZ6uTjxxnGdLt2S6"}, {"track_number": "Rollin (feat. Future & Khalid)", "track_name": "Calvin Harris ", "track_url": "https://open.spotify.com/track/0lMbuWUpfTWhEmOKxppEau"}, {"track_number": "Post to Be (feat. Chris Brown & Jhene Aiko)", "track_name": "Omarion ", "track_url": "https://open.spotify.com/track/0fgZUSa7D7aVvv3GfO0A1n"}, {"track_number": "Say Something", "track_name": "A Great Big World ", "track_url": "https://open.spotify.com/track/5TvE3pk05pyFIGdSY9j4DJ"}, {"track_number": "Hey Brother", "track_name": "Avicii ", "track_url": "https://open.spotify.com/track/4RXpgGM7A4Hg7cFBoH5KyF"}, {"track_number": "Love On The Brain", "track_name": "Rihanna ", "track_url": "https://open.spotify.com/track/2aksifNn5ph8igDOkPBA02"}, {"track_number": "Body Like A Back Road", "track_name": "Sam Hunt ", "track_url": "https://open.spotify.com/track/7mldq42yDuxiUNn08nvzHO"}, {"track_number": "Who Do You Love?", "track_name": "YG ", "track_url": "https://open.spotify.com/track/1uDjaezEbalGyGnuH80zDK"}, {"track_number": "8TEEN", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/5bgwqaRSS3M8WHWruHgSL5"}, {"track_number": "All My Friends (feat. Tinashe & Chance the Rapper)", "track_name": "Snakehips ", "track_url": "https://open.spotify.com/track/6TaqooOXAEcijL6G1AWS2K"}, {"track_number": "Millionaire (feat. Nelly)", "track_name": "Cash Cash ", "track_url": "https://open.spotify.com/track/3UDXkdQquqCEAJdNAsA1wO"}, {"track_number": "Bad and Boujee (feat. Lil Uzi Vert)", "track_name": "Migos ", "track_url": "https://open.spotify.com/track/4Km5HrUvYTaSUfiSGPJeQR"}, {"track_number": "Time of Our Lives", "track_name": "Pitbull ", "track_url": "https://open.spotify.com/track/2bJvI42r8EF3wxjOuDav4r"}, {"track_number": "Seven Million (feat. Future)", "track_name": "Lil Uzi Vert ", "track_url": "https://open.spotify.com/track/6j0teRL3WdExzqmy334sh5"}, {"track_number": "Me You", "track_name": "Russ ", "track_url": "https://open.spotify.com/track/4f1QbCjIAgQwnf7ms9NXWx"}, {"track_number": "Studio", "track_name": "ScHoolboy Q ", "track_url": "https://open.spotify.com/track/29gsi1zZrZxdStACmTQB0Z"}, {"track_number": "Let You Love Me", "track_name": "Rita Ora ", "track_url": "https://open.spotify.com/track/6xtcFXSo8H9BZN637BMVKS"}, {"track_number": "Darkside", "track_name": "Alan Walker ", "track_url": "https://open.spotify.com/track/1snWlbcbgQpJfknoI30DWG"}, {"track_number": "Shining (feat. Beyoncé & Jay-Z)", "track_name": "DJ Khaled ", "track_url": "https://open.spotify.com/track/7Fa5UNizycSms5jP3SQD3F"}, {"track_number": "Hotline Bling", "track_name": "Drake ", "track_url": "https://open.spotify.com/track/0wwPcA6wtMf6HUMpIRdeP7"}, {"track_number": "Human", "track_name": "Rag'n'Bone Man ", "track_url": "https://open.spotify.com/track/58zsLZPvfflaiIbNWoA22O"}, {"track_number": "Run Me Dry", "track_name": "Bryson Tiller ", "track_url": "https://open.spotify.com/track/5GG3knKdxKWrNboRijxeKF"}, {"track_number": "Secret Love Song (feat. Jason Derulo)", "track_name": "Little Mix ", "track_url": "https://open.spotify.com/track/4JIo8RztBbELr2gWJ5OGK6"}, {"track_number": "At My Best (feat. Hailee Steinfeld)", "track_name": "Machine Gun Kelly ", "track_url": "https://open.spotify.com/track/77lGafvlU68CeHgB2pkHC9"}, {"track_number": "A Lie", "track_name": "French Montana ", "track_url": "https://open.spotify.com/track/1vVNlXi8gf8tZ7OhnEs4VE"}, {"track_number": "MIA (feat. Drake)", "track_name": "Bad Bunny ", "track_url": "https://open.spotify.com/track/116H0KvKr2Zl4RPuVBruDO"}, {"track_number": "Cool Girl", "track_name": "Tove Lo ", "track_url": "https://open.spotify.com/track/3tJ4y2Zqx6gM9xOAuFfsSF"}, {"track_number": "Alarm", "track_name": "Anne-Marie ", "track_url": "https://open.spotify.com/track/572xshmOviSGH70oPYMCZV"}, {"track_number": "Ex's & Oh's", "track_name": "Elle King ", "track_url": "https://open.spotify.com/track/2vW5tqS1EFel9yYOQ7WZmE"}, {"track_number": "Why", "track_name": "Sabrina Carpenter ", "track_url": "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk"}, {"track_number": "Signs", "track_name": "Drake ", "track_url": "https://open.spotify.com/track/6Na5uKk5SsqZimk0hAWo8y"}, {"track_number": "No Role Modelz", "track_name": "J. Cole ", "track_url": "https://open.spotify.com/track/62vpWI1CHwFy7tMIcSStl8"}, {"track_number": "Earned It (Fifty Shades Of Grey)", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/4frLb7nWtsz2ymBE6k2GRP"}, {"track_number": "Where Ya At (feat. Drake)", "track_name": "Future ", "track_url": "https://open.spotify.com/track/5nN8BwAQDJDguq7Dpd3JQQ"}, {"track_number": "Someone New", "track_name": "Hozier ", "track_url": "https://open.spotify.com/track/4yHyWMobcZQAI0ysLkwjUI"}, {"track_number": "Don't", "track_name": "Bryson Tiller ", "track_url": "https://open.spotify.com/track/3pXF1nA74528Edde4of9CC"}, {"track_number": "Two High", "track_name": "Moon Taxi ", "track_url": "https://open.spotify.com/track/5huOzlgCK7PsMSG4TFBvKY"}, {"track_number": "High On Life (feat. Bonn)", "track_name": "Martin Garrix ", "track_url": "https://open.spotify.com/track/4ut5G4rgB1ClpMTMfjoIuy"}, {"track_number": "Please Don't Go", "track_name": "Joel Adams ", "track_url": "https://open.spotify.com/track/3cNjgVBKTJ1SvKhunrCdVy"}, {"track_number": "Weekend (feat. Miguel)", "track_name": "Mac Miller ", "track_url": "https://open.spotify.com/track/6GnhWMhgJb7uyiiPEiEkDA"}, {"track_number": "Something New (feat. Ty Dolla $ign)", "track_name": "Wiz Khalifa ", "track_url": "https://open.spotify.com/track/6u8hSdYZxbK5EczDPRIXXf"}, {"track_number": "Sing Me to Sleep", "track_name": "Alan Walker ", "track_url": "https://open.spotify.com/track/2Fjz5ZC5BvFdCqcnTZ3ilH"}, {"track_number": "All of Me", "track_name": "John Legend ", "track_url": "https://open.spotify.com/track/3uhBIQ7tv8j1FME8cFGEfG"}, {"track_number": "No More Sad Songs (feat. Machine Gun Kelly)", "track_name": "Little Mix ", "track_url": "https://open.spotify.com/track/1NXDq5UBby80GsRNjGXVwE"}, {"track_number": "Often", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/4PhsKqMdgMEUSstTDAmMpg"}, {"track_number": "Selfish", "track_name": "PnB Rock ", "track_url": "https://open.spotify.com/track/2xbI8Vmyv3TkpTdywpPyNw"}, {"track_number": "Slow Motion", "track_name": "Trey Songz ", "track_url": "https://open.spotify.com/track/4NYwy0R3NdvORX2B6OZXBT"}, {"track_number": "Rake It Up (feat. Nicki Minaj)", "track_name": "Yo Gotti ", "track_url": "https://open.spotify.com/track/4knL4iPxPOZjQzTUlELGSY"}, {"track_number": "There's No Way (feat. Julia Michaels)", "track_name": "Lauv ", "track_url": "https://open.spotify.com/track/2hnxrRNzF74mdDzpQZQukQ"}, {"track_number": "All Mine", "track_name": "Kanye West ", "track_url": "https://open.spotify.com/track/3qnoOm4fwZPBS116f5hpgF"}, {"track_number": "This Feeling (feat. Kelsea Ballerini)", "track_name": "The Chainsmokers ", "track_url": "https://open.spotify.com/track/15kQGEy89K8deJcZVFEn0N"}, {"track_number": "How Long", "track_name": "Charlie Puth ", "track_url": "https://open.spotify.com/track/6wmAHw1szh5RCKSRjiXhPe"}, {"track_number": "White Iverson", "track_name": "Post Malone ", "track_url": "https://open.spotify.com/track/6eT7xZZlB2mwyzJ2sUKG6w"}, {"track_number": "Nobody Else but You", "track_name": "Trey Songz ", "track_url": "https://open.spotify.com/track/1HOUzEsetdIPSpAgRPhZQt"}, {"track_number": "Praise The Lord (Da Shine) (feat. Skepta)", "track_name": "A$AP Rocky ", "track_url": "https://open.spotify.com/track/7ycWLEP1GsNjVvcjawXz3z"}, {"track_number": "Summertime Sadness", "track_name": "Lana Del Rey ", "track_url": "https://open.spotify.com/track/1FEiijYPJtyswChfcpv3p0"}, {"track_number": "We Don't Care", "track_name": "Sigala ", "track_url": "https://open.spotify.com/track/6THwtgImf1ZAR2w3iknjeS"}, {"track_number": "Jump Out The Window", "track_name": "Big Sean ", "track_url": "https://open.spotify.com/track/1jQsKN68yE94tMYml0wHMd"}, {"track_number": "1, 2, 3 (feat. Jason Derulo & De La Ghetto)", "track_name": "Sofía Reyes ", "track_url": "https://open.spotify.com/track/4QtiVmuA88tPQiCOHZuQ5b"}, {"track_number": "Lights", "track_name": "Single Version - Ellie Goulding ", "track_url": "https://open.spotify.com/track/7gUpO6td4OOnu0Lf9vhcIV"}, {"track_number": "Black Barbies", "track_name": "Nicki Minaj ", "track_url": "https://open.spotify.com/track/3y9cCbnBn0zjkJa2YkOj70"}, {"track_number": "All About That Bass", "track_name": "Meghan Trainor ", "track_url": "https://open.spotify.com/track/5jE48hhRu8E6zBDPRSkEq7"}, {"track_number": "Heathens", "track_name": "Twenty One Pilots ", "track_url": "https://open.spotify.com/track/6i0V12jOa3mr6uu4WYhUBr"}, {"track_number": "Where Are Ü Now (with Justin Bieber)", "track_name": "Jack Ü ", "track_url": "https://open.spotify.com/track/66hayvUbTotekKU3H4ta1f"}, {"track_number": "All Time Low", "track_name": "Jon Bellion ", "track_url": "https://open.spotify.com/track/1CnPYaKxTVb4LWOtiGOm0m"}, {"track_number": "Let It Go", "track_name": "James Bay ", "track_url": "https://open.spotify.com/track/13HVjjWUZFaWilh2QUJKsP"}, {"track_number": "All The Way Up (feat. Infared)", "track_name": "Fat Joe ", "track_url": "https://open.spotify.com/track/7Ezwtgfw7khBrpvaNPtMoT"}, {"track_number": "Plug Walk", "track_name": "Rich The Kid ", "track_url": "https://open.spotify.com/track/1ZAyjvIk9YiD76yYy0TEG6"}, {"track_number": "Raging (feat. Kodaline)", "track_name": "Kygo ", "track_url": "https://open.spotify.com/track/2Vhd5uZB4brKHmM0MNxkZo"}, {"track_number": "Dynamite (feat. Pretty Sister)", "track_name": "Nause ", "track_url": "https://open.spotify.com/track/2Ae5awwKvQpTBKQHr1TYCg"}, {"track_number": "oui", "track_name": "Jeremih ", "track_url": "https://open.spotify.com/track/0PJIbOdMs3bd5AT8liULMQ"}, {"track_number": "1999", "track_name": "Charli XCX ", "track_url": "https://open.spotify.com/track/05mAIVLkIWc2d1UBYZBCp8"}, {"track_number": "I Took A Pill In Ibiza", "track_name": "Seeb Remix - Mike Posner ", "track_url": "https://open.spotify.com/track/1MtUq6Wp1eQ8PC6BbPCj8P"}, {"track_number": "Body Party", "track_name": "Ciara ", "track_url": "https://open.spotify.com/track/30lAGXMytmKjGVZk9BBC3m"}, {"track_number": "Either Way (feat. Joey Bada$$)", "track_name": "Snakehips ", "track_url": "https://open.spotify.com/track/3nodtPfXcok53E8Uze8gvD"}, {"track_number": "The Monster", "track_name": "Eminem ", "track_url": "https://open.spotify.com/track/3u0qM9FSgL3zXi1Vn75b0i"}, {"track_number": "Meant to Be (feat. Florida Georgia Line)", "track_name": "Bebe Rexha ", "track_url": "https://open.spotify.com/track/4e4fqjx0Izh4svvTef1z7e"}]
const Anger = [{"track_number": "Dessert", "track_name": "Dawin ", "track_url": "https://open.spotify.com/track/3mg29Lwvo673TkDhE3kB9W"}, {"track_number": "Man's Not Hot", "track_name": "Big Shaq ", "track_url": "https://open.spotify.com/track/6X5OFBbrsHRsyO1zP7udgr"}, {"track_number": "Taki Taki (with Selena Gomez, Ozuna & Cardi B)", "track_name": "DJ Snake ", "track_url": "https://open.spotify.com/track/4w8niZpiMy6qz1mntFA5uM"}, {"track_number": "Pray For Me (with Kendrick Lamar)", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/77UjLW8j5UAGAGVGhR5oUK"}, {"track_number": "Thrift Shop (feat. Wanz)", "track_name": "Macklemore & Ryan Lewis ", "track_url": "https://open.spotify.com/track/3AYcyxEACnmE6d96RPubID"}, {"track_number": "DEVASTATED", "track_name": "Joey Bada$$ ", "track_url": "https://open.spotify.com/track/4ntsD33Pgsgk8rUyZLLiUV"}, {"track_number": "Love Me Now", "track_name": "John Legend ", "track_url": "https://open.spotify.com/track/6nxQdXa1uAL0rY72wPZu89"}, {"track_number": "Always Remember Us This Way", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/2rbDhOo9Fh61Bbu23T2qCk"}, {"track_number": "Post to Be (feat. Chris Brown & Jhene Aiko)", "track_name": "Omarion ", "track_url": "https://open.spotify.com/track/0fgZUSa7D7aVvv3GfO0A1n"}, {"track_number": "Mine", "track_name": "Bazzi ", "track_url": "https://open.spotify.com/track/7uzmGiiJyRfuViKKK3lVmR"}, {"track_number": "All In My Head (Flex) (feat. Fetty Wap)", "track_name": "Fifth Harmony ", "track_url": "https://open.spotify.com/track/7nD9nN3jord9wWcfW3Gkcm"}, {"track_number": "It's Gotta Be You", "track_name": "Isaiah Firebrace ", "track_url": "https://open.spotify.com/track/6cAKeFFYW2aClZSUyvqAEW"}, {"track_number": "Last Friday Night (T.G.I.F.)", "track_name": "Katy Perry ", "track_url": "https://open.spotify.com/track/3avYqdwHKEq8beXbeWCKqJ"}, {"track_number": "Some Nights", "track_name": "fun. ", "track_url": "https://open.spotify.com/track/67WTwafOMgegV6ABnBQxcE"}, {"track_number": "Feeling Myself", "track_name": "Nicki Minaj ", "track_url": "https://open.spotify.com/track/5fyIGoaaKelzdyW8ELhYJZ"}, {"track_number": "King's Dead (with Kendrick Lamar, Future & James Blake)", "track_name": "Jay Rock ", "track_url": "https://open.spotify.com/track/51rXHuKN8Loc4sUlKPODgH"}, {"track_number": "Love Lies (with Normani)", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/45Egmo7icyopuzJN0oMEdk"}, {"track_number": "Ride", "track_name": "Twenty One Pilots ", "track_url": "https://open.spotify.com/track/2Z8WuEywRWYTKe1NybPQEW"}, {"track_number": "Bitch Better Have My Money", "track_name": "Rihanna ", "track_url": "https://open.spotify.com/track/0NTMtAO2BV4tnGvw9EgBVq"}, {"track_number": "We Don't Care", "track_name": "Sigala ", "track_url": "https://open.spotify.com/track/6THwtgImf1ZAR2w3iknjeS"}, {"track_number": "Ain't Giving Up", "track_name": "Craig David ", "track_url": "https://open.spotify.com/track/3mkJigBxWd5DJUsRuwHG3f"}, {"track_number": "Dead", "track_name": "Madison Beer ", "track_url": "https://open.spotify.com/track/13W2FZtELfJiVBst64qKf4"}, {"track_number": "Team", "track_name": "Lorde ", "track_url": "https://open.spotify.com/track/3G6hD9B2ZHOsgf4WfNu7X1"}, {"track_number": "My Love (feat. Major Lazer, WizKid, Dua Lipa)", "track_name": "Wale ", "track_url": "https://open.spotify.com/track/7rfiXyFb5M9BqdkvKvVEiB"}, {"track_number": "Body Like A Back Road", "track_name": "Sam Hunt ", "track_url": "https://open.spotify.com/track/7mldq42yDuxiUNn08nvzHO"}, {"track_number": "Domino", "track_name": "Jessie J ", "track_url": "https://open.spotify.com/track/2fQxE0jVrjNMT9oJAXtSJR"}, {"track_number": "Say My Name", "track_name": "David Guetta ", "track_url": "https://open.spotify.com/track/0YammaEkYSeo9vQYZ1OwS6"}, {"track_number": "All Mine", "track_name": "Kanye West ", "track_url": "https://open.spotify.com/track/3qnoOm4fwZPBS116f5hpgF"}, {"track_number": "Selfish", "track_name": "PnB Rock ", "track_url": "https://open.spotify.com/track/2xbI8Vmyv3TkpTdywpPyNw"}, {"track_number": "Perfect", "track_name": "Ed Sheeran ", "track_url": "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"}, {"track_number": "Kissing Strangers", "track_name": "DNCE ", "track_url": "https://open.spotify.com/track/0w2AqrJ9afRXiTgfgW4tLd"}, {"track_number": "Call Out My Name", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/1gm616Plq4ScqNi7TVkZ5N"}, {"track_number": "Elastic Heart", "track_name": "Sia ", "track_url": "https://open.spotify.com/track/6kwAbEjseqBob48jCus7Sz"}, {"track_number": "Bon Appétit", "track_name": "Katy Perry ", "track_url": "https://open.spotify.com/track/4rHmKlFRiFzabiVO6e9w2e"}, {"track_number": "I Don’t Wanna Live Forever (Fifty Shades Darker)", "track_name": "ZAYN ", "track_url": "https://open.spotify.com/track/6yIdwnpDHufLWgQcveTPMk"}, {"track_number": "Crying in the Club", "track_name": "Camila Cabello ", "track_url": "https://open.spotify.com/track/1SJtlNRJDeYHioymcvsqev"}, {"track_number": "Time of Our Lives", "track_name": "Pitbull ", "track_url": "https://open.spotify.com/track/2bJvI42r8EF3wxjOuDav4r"}, {"track_number": "Sexy Dirty Love", "track_name": "Demi Lovato ", "track_url": "https://open.spotify.com/track/3Nvb9jMtkIbUgU5JMdAyis"}, {"track_number": "Head Above Water", "track_name": "Avril Lavigne ", "track_url": "https://open.spotify.com/track/1N7YeVU0ZwAFbOhwM61ef6"}, {"track_number": "One Call Away", "track_name": "Charlie Puth ", "track_url": "https://open.spotify.com/track/6vSforRhuzsA0D0SO9fG1S"}, {"track_number": "Wolves", "track_name": "Selena Gomez ", "track_url": "https://open.spotify.com/track/0tBbt8CrmxbjRP0pueQkyU"}, {"track_number": "Electric Love", "track_name": "BØRNS ", "track_url": "https://open.spotify.com/track/2GiJYvgVaD2HtM8GqD9EgQ"}, {"track_number": "Why", "track_name": "Sabrina Carpenter ", "track_url": "https://open.spotify.com/track/1byScELwcJffsdL5QWa6Yk"}, {"track_number": "Such A Boy", "track_name": "Astrid S ", "track_url": "https://open.spotify.com/track/3oIhthYPSKwAwJLA8JClkV"}, {"track_number": "Timber (feat. Ke$ha)", "track_name": "Pitbull ", "track_url": "https://open.spotify.com/track/3cHyrEgdyYRjgJKSOiOtcS"}, {"track_number": "Exchange", "track_name": "Bryson Tiller ", "track_url": "https://open.spotify.com/track/43PuMrRfbyyuz4QpZ3oAwN"}, {"track_number": "Naked", "track_name": "DNCE ", "track_url": "https://open.spotify.com/track/1Jajkjm81BVqptjRBoJcAn"}, {"track_number": "Royals", "track_name": "Lorde ", "track_url": "https://open.spotify.com/track/2dLLR6qlu5UJ5gk0dKz0h3"}, {"track_number": "1, 2, 3 (feat. Jason Derulo & De La Ghetto)", "track_name": "Sofía Reyes ", "track_url": "https://open.spotify.com/track/4QtiVmuA88tPQiCOHZuQ5b"}, {"track_number": "Perplexing Pegasus", "track_name": "From SR3MM - Rae Sremmurd ", "track_url": "https://open.spotify.com/track/1ung2kajpw24AaHjBtPY3j"}, {"track_number": "Suncity (feat. Empress Of)", "track_name": "Khalid ", "track_url": "https://open.spotify.com/track/4AhSkRYioEIfGvCV19peYN"}, {"track_number": "Say It", "track_name": "Tory Lanez ", "track_url": "https://open.spotify.com/track/2Gyc6e2cLxA5hoX1NOvYnU"}, {"track_number": "Where Ya At (feat. Drake)", "track_name": "Future ", "track_url": "https://open.spotify.com/track/5nN8BwAQDJDguq7Dpd3JQQ"}, {"track_number": "7 Years", "track_name": "Lukas Graham ", "track_url": "https://open.spotify.com/track/7129iqBafaphfc3WPCGC0L"}, {"track_number": "Poker Face", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/1QV6tiMFM6fSOKOGLMHYYg"}, {"track_number": "Prayer in C", "track_name": "Robin Schulz Radio Edit - Lilly Wood and The Prick ", "track_url": "https://open.spotify.com/track/5fnA9mkIfScSqHIpeDyvck"}, {"track_number": "Teenage Dream", "track_name": "Katy Perry ", "track_url": "https://open.spotify.com/track/5jzKL4BDMClWqRguW5qZvh"}, {"track_number": "Quit (feat. Ariana Grande)", "track_name": "Cashmere Cat ", "track_url": "https://open.spotify.com/track/4rwqrKdwlFWJ6LvPYaOtgn"}, {"track_number": "Attention", "track_name": "Charlie Puth ", "track_url": "https://open.spotify.com/track/5cF0dROlMOK5uNZtivgu50"}, {"track_number": "Applause", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/2Zj4FUsMtu9PMuJsHbGbdv"}, {"track_number": "Secret Love Song (feat. Jason Derulo)", "track_name": "Little Mix ", "track_url": "https://open.spotify.com/track/4JIo8RztBbELr2gWJ5OGK6"}, {"track_number": "Starboy", "track_name": "The Weeknd ", "track_url": "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB"}, {"track_number": "Sing Me to Sleep", "track_name": "Alan Walker ", "track_url": "https://open.spotify.com/track/2Fjz5ZC5BvFdCqcnTZ3ilH"}, {"track_number": "Don't Wanna Know (feat. Kendrick Lamar)", "track_name": "Maroon 5 ", "track_url": "https://open.spotify.com/track/5o3GnrcFtvkdf3zFznuSbA"}, {"track_number": "goosebumps", "track_name": "Travis Scott ", "track_url": "https://open.spotify.com/track/6gBFPUFcJLzWGx4lenP6h2"}, {"track_number": "A Lie", "track_name": "French Montana ", "track_url": "https://open.spotify.com/track/1vVNlXi8gf8tZ7OhnEs4VE"}, {"track_number": "Million Reasons", "track_name": "Lady Gaga ", "track_url": "https://open.spotify.com/track/7dZ1Odmx9jWIweQSatnRqo"}, {"track_number": "Side Effects (feat. Emily Warren)", "track_name": "The Chainsmokers ", "track_url": "https://open.spotify.com/track/5hrXLJJrnKraxRQntH0Vv9"}, {"track_number": "Lucid Dreams", "track_name": "Juice WRLD ", "track_url": "https://open.spotify.com/track/0s3nnoMeVWz3989MkNQiRf"}, {"track_number": "Finest Hour (feat. Abir)", "track_name": "Cash Cash ", "track_url": "https://open.spotify.com/track/0p0ljM6RxgpGt7wthGqBZa"}, {"track_number": "Fetish (feat. Gucci Mane)", "track_name": "Selena Gomez ", "track_url": "https://open.spotify.com/track/4lnAN2S1fcI0SjxEbksZVr"}, {"track_number": "Broccoli (feat. Lil Yachty)", "track_name": "DRAM ", "track_url": "https://open.spotify.com/track/7yyRTcZmCiyzzJlNzGC9Ol"}, {"track_number": "Fancy", "track_name": "Iggy Azalea ", "track_url": "https://open.spotify.com/track/3W3KtDwAIg3mAruSpnfG3Q"}, {"track_number": "Nina Cried Power (feat. Mavis Staples)", "track_name": "Hozier ", "track_url": "https://open.spotify.com/track/7wR5r0KYGXBpyWXCdyYs3F"}, {"track_number": "Bodak Yellow", "track_name": "Cardi B ", "track_url": "https://open.spotify.com/track/6KBYefIoo7KydImq1uUQlL"}, {"track_number": "3005", "track_name": "Childish Gambino ", "track_url": "https://open.spotify.com/track/3Z2sglqDj1rDRMF5x0Sz2R"}, {"track_number": "Wait", "track_name": "Maroon 5 ", "track_url": "https://open.spotify.com/track/6AvfZXpbb6r35DfF7gHPRq"}, {"track_number": "...Ready For It?", "track_name": "Taylor Swift ", "track_url": "https://open.spotify.com/track/2yLa0QULdQr0qAIvVwN6B5"}, {"track_number": "OMG (feat. Quavo)", "track_name": "Camila Cabello ", "track_url": "https://open.spotify.com/track/4xBjsLUSjcx2h7PcRikpQp"}, {"track_number": "Cheerleader", "track_name": "Felix Jaehn Remix Radio Edit - OMI ", "track_url": "https://open.spotify.com/track/7vFoFDWqTX0mHzLfrF1Cfy"}, {"track_number": "Rock Bottom", "track_name": "Hailee Steinfeld ", "track_url": "https://open.spotify.com/track/1n8ZUpQ0iVY6gVBgEUdA2Q"}, {"track_number": "The Way Life Goes (feat. Oh Wonder)", "track_name": "Lil Uzi Vert ", "track_url": "https://open.spotify.com/track/2eAZfqOm4EnOF9VvN50Tyc"}, {"track_number": "Amnesia", "track_name": "5 Seconds of Summer ", "track_url": "https://open.spotify.com/track/1JCCdiru7fhstOIF4N7WJC"}, {"track_number": "Go Flex", "track_name": "Post Malone ", "track_url": "https://open.spotify.com/track/5yuShbu70mtHXY0yLzCQLQ"}, {"track_number": "i hate u, i love u (feat. olivia o'brien)", "track_name": "gnash ", "track_url": "https://open.spotify.com/track/7vRriwrloYVaoAe3a9wJHe"}, {"track_number": "Recognize (feat. Drake)", "track_name": "PARTYNEXTDOOR ", "track_url": "https://open.spotify.com/track/5wUUWVRvrciJqFitZF8R0P"}, {"track_number": "Now Or Never", "track_name": "Halsey ", "track_url": "https://open.spotify.com/track/7i2DJ88J7jQ8K7zqFX2fW8"}, {"track_number": "Don't Leave", "track_name": "Snakehips ", "track_url": "https://open.spotify.com/track/0Zx8khUcEfCFK2AEoIhC92"}, {"track_number": "Counting Stars", "track_name": "OneRepublic ", "track_url": "https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1"}, {"track_number": "Romantic", "track_name": "NOTD Remix - Stanaj ", "track_url": "https://open.spotify.com/track/7e6FvCvngX5job1PUYIIIL"}, {"track_number": "Happier", "track_name": "Ed Sheeran ", "track_url": "https://open.spotify.com/track/2RttW7RAu5nOAfq6YFvApB"}, {"track_number": "You Don't Know Love", "track_name": "Olly Murs ", "track_url": "https://open.spotify.com/track/3ZeszLrkylVDyAFS9MLajv"}, {"track_number": "Cold Water (feat. Justin Bieber & MØ)", "track_name": "Major Lazer ", "track_url": "https://open.spotify.com/track/6gFPdkLitG8mpiWKKZ3lgE"}, {"track_number": "Knew Better / Forever Boy", "track_name": "Ariana Grande ", "track_url": "https://open.spotify.com/track/2SUQGI9ztmp0PQd1J8SVHx"}, {"track_number": "Privacy", "track_name": "Chris Brown ", "track_url": "https://open.spotify.com/track/5kyd6oKvKmj6mWCaAaHoN4"}, {"track_number": "Gold", "track_name": "Kiiara ", "track_url": "https://open.spotify.com/track/6WhzFzROw3aq3rPWjgYlxr"}, {"track_number": "Billie Jean", "track_name": "Michael Jackson ", "track_url": "https://open.spotify.com/track/5ChkMS8OtdzJeqyybCc9R5"}, {"track_number": "Let You Love Me", "track_name": "Rita Ora ", "track_url": "https://open.spotify.com/track/6xtcFXSo8H9BZN637BMVKS"}, {"track_number": "Mama", "track_name": "Jonas Blue ", "track_url": "https://open.spotify.com/track/47OVNnZJzIkrsEiZ4n187p"}, {"track_number": "Clandestino", "track_name": "Shakira ", "track_url": "https://open.spotify.com/track/7DrluKkTviBwCc8AV3VGmf"}]

const playlistMap = {
  Joy: Joy,
  Neutral: Neutral,
  Anger: Anger,
  Sad: Sad
};
const Entries = () => {
  const { fetchUser } = useContext(UserContext);
  const [newEntryFlag, setNewEntryFlag] = useState(false);
  const [showEntries, setShowEntries] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [showPlaylists, setShowPlaylists] = useState(false);  
  const [currentUser, setCurrentUser] = useState("");
  const [mood, setMood] = useState('');
  const [comments, setComments] = useState([]) 
  const [isCommenting, setIsCommenting] = useState(false);
  const [vote, setVote] = useState(0);
  const [entriesList, setEntriesList] = useState([
    {
        id: "",
        title: "",
        text: "",
      }
    ]);

    const increase = async (entry_id, index) => {
      await fetch(`/api/upVote/${entry_id}/${index}`, { method: "PUT" })
        .then((response) => {
          if (response.ok) {
            console.log('Comment updated successfully');
          } else {
            throw new Error('Failed to update comment');
          }
        });
    
      await fetch(`/api/getVote/${entry_id}/${index}`, { method: "GET" })
        .then(response => response.json())
        .then((jsonRes) => {
          const updatedComments = [...comments];
          updatedComments[index].rating = jsonRes.rating;
          setComments(updatedComments);
          console.log("Current Vote: " +  jsonRes.rating);
        });
    };
    
    const decrease = async (entry_id, index) => {
      await fetch(`/api/downVote/${entry_id}/${index}`, { method: "PUT" })
        .then((response) => {
          if (response.ok) {
            console.log('Comment updated successfully');
          } else {
            throw new Error('Failed to update comment');
          }
        });
    
      await fetch(`/api/getVote/${entry_id}/${index}`, { method: "GET" })
        .then(response => response.json())
        .then((jsonRes) => {
          const updatedComments = [...comments];
          updatedComments[index].rating = jsonRes.rating;
          setComments(updatedComments);
          console.log("Current Vote: " +  jsonRes.rating);
        });
    };    

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) {
        console.log("Current User:", fetchedUser.profile.email);
        setCurrentUser(fetchedUser.profile.email);
        fetch(`/api/allEntries/${fetchedUser.profile.email}`, {method:"GET"})
          .then(response => response.json())
          .then((jsonRes) => {
            const transformedEntries = jsonRes.map((entry) => ({
              id: entry._id,
              title: entry.title,
              text: entry.text,
              mood: entry.mood
            }));
            setEntriesList(transformedEntries);
          })
          // .then((jsonRes) => console.log(jsonRes))
          // console.log(entriesList)
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleFetchComments = async (entry) => {
    try {
      fetch(`/api/allComments/${entry}`, { method: "GET" }).then(response=>response.json())
        .then((jsonRes) => {
          setComments(jsonRes);
        })
    } catch (err) {
      console.log("Error in handleFechComments")
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchUser();
  },[]);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setComments([]);
    setIsModalOpen(true);
    handleFetchComments(entry.id);
  };

  const closeEntryModal = () => {
    setIsModalOpen(false);
  };

  function openModal() {
    setNewEntryFlag(true);
  }

  function closeModal() {
    setNewEntryFlag(false);
    // window.location.reload(true);
    handleFetchUser();
  }

  function toggleEntries() {
    setShowEntries(!showEntries);
  }

  function togglePlaylists(){
    setShowPlaylists(!showPlaylists)
  }

  const deleteEntry = (entry) => {
    console.log("Deleting entry:", entry.id);
    fetch(`/api/deleteEntry/${entry.id}`, {method:"DELETE"})
      .then(response => response.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        setEntriesList((prevEntries) =>
          prevEntries.filter((prevEntry) => prevEntry.id !== entry.id)
        );
      })
      .catch(err => console.log(err));
  };

  const onSubmit = (event) => {
    main(document.getElementById('entry').value).then((result)=> {
        setMood(result);
        event.preventDefault();
        fetch('/api/newEntry', {
          method: 'POST',
          body: JSON.stringify({ 
            user: currentUser,
            title: document.getElementById('title').value,
            entry: document.getElementById('entry').value,
            mood: result
           }),
           headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.ok) {
            console.log('Entry submitted successfully');
            closeModal();
            // Handle the response from the API
          } else {
            throw new Error('Failed to submit entry');
          }
        })
        .catch((error) => {
          console.error('Error submitting entry:', error);
          alert(error);
        })
      })
  };  

  const addComment = (event) => {
    event.preventDefault();
    fetch('/api/newComment', {
      method: 'POST',
      body: JSON.stringify({username: currentUser, entry_id: selectedEntry.id, comment: document.getElementById('comment').value, rating: 0}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        console.log('Comment submitted successfully');
        // Handle the response from the API
      } else {
        throw new Error('Failed to submit comment');
      }
    })
    .catch((error) => {
      console.error('Error submitting comment:', error);
      alert(error);
    })
    setComments([...comments, {user: currentUser, comment: document.getElementById('comment').value, rating: '0'}])
    document.getElementById('comment').value = "";
    setIsCommenting(false);
    // handleFetchComments(selectedEntry.id);
    // window.location.reload();
  }

  const handleComment = () => {
    setIsCommenting(!isCommenting);
  }

  return (
    <>
      <NavBar />
      <Box className="my-entries-wrapper">
        <Box className="new-entry-button-container">
          <Button variant="contained" className="new-entry-button" onClick={openModal} style={{ marginTop: '10px', marginRight: '10px' }}>New Entry</Button>
          <Button variant="contained" onClick={toggleEntries} style={{ marginTop: '10px' }}>
            {showEntries ? 'Hide Entries' : 'Show Entries'}
          </Button>
        </Box>
        <Modal
          isOpen={newEntryFlag}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          >
          <Typography variant="h4" gutterBottom> New Entry </Typography>
          {/* <form id="new-entry-form" action='http://localhost:1234/api/newEntry' method="POST"> */}
          <form id="new-entry-form" onSubmit={onSubmit}>
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Title</InputLabel>
              <TextField id="title" name="title" variant="outlined" fullWidth />
            </Box>
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Entry</InputLabel>
              <TextField id="entry" name="entry" fullWidth multiline rows={20} />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={closeModal}>Close</Button>
              <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} type="submit" >Submit</Button>
            </Box>
          </form>
        </Modal>
        <Box className="my-entries-container" style={{ display: showEntries ? 'block' : 'none', marginTop: '10px' }}>
          <List>
            <ListItemText> 
              <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                Title 
              </Typography>
            </ListItemText> 
            {entriesList.map((entry) => (
              <Box display="flex" alignItems="center">
                <ListItemButton key={entry.title} onClick={() => handleEntryClick(entry)}>
                  <ListItemText primary={entry.title} />
                </ListItemButton>
              <Button style={{marginLeft: '10px', marginRight: '10px'}} variant="contained" color="error" onClick={() => {deleteEntry(entry)}}> Remove </Button>              
             </Box>
            ))}      
          </List>
          <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom style={{ marginRight: '10px' }}>
              Entry Details
            </Typography>
            <Button variant="contained" style={{ marginTop: '-10px' }} onClick={togglePlaylists}>
              View Playlist
            </Button>
            <Modal
              isOpen={showPlaylists}
              ariaHideApp={false}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom style={{ marginRight: '25%', textDecoration: 'underline' }}>
                Your Playlist
              </Typography>
              {selectedEntry != null && (
                <Typography variant="h4" gutterBottom style={{ marginRight: '25px' }}>
                  Predicted Mood: {selectedEntry.mood}
                </Typography>
              )}
            </div>
              <Button
              variant="contained"
              color="error"
              style={{ position: 'fixed', top: '0', right: '0', marginTop: '55px', marginRight: '55px' }}
              onClick={togglePlaylists}
              >
              Close
            </Button>
            <ul>
            {selectedEntry != null && (shuffle(playlistMap[selectedEntry.mood]).slice(0, 25).map((item, index) => (
              <li key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" style={{ marginRight: '10px' }}>
                    {index + 1}.
                  </Typography>
                  <Typography variant="body1">
                    {item.track_number} - {item.track_name}
                  </Typography>
                </div>
                <a href={item.track_url} target="_blank" rel="noopener noreferrer">
                {item.track_url}
                </a>
              </li>
            )))}
          </ul>
            </Modal>

          </div>
            {selectedEntry && (
              <>
                <Typography variant="h5" gutterBottom> Title: {selectedEntry.title} </Typography>
                <Typography variant="body1" gutterBottom> Text: {selectedEntry.text} </Typography>
              </>
            )}
            <Box>
              { comments.length > 0 && (comments.map((comment, i) => (
                <List key={i}>
                  <ListItem sx={{border:"1px solid black", borderRadius: "30px"}} >
                  <ListItemText
                  primary={
                    <Typography variant="h6" style={{ fontSize: '16px' }}>
                      {comment.user}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="h5" style={{ fontSize: '20px' }}>
                      {comment.comment}
                    </Typography>
                  }
                  />
                    <Box id = "arrow_container" style={{marginTop:'12px'}}>
                    <Stack direction="column" spacing = {2}>
                        <IconButton id = "arrows" onClick = {() => {increase(selectedEntry.id, i)}}>
                            <KeyboardArrowUpIcon/> 
                        </IconButton>
                        <span id="vote" >{comment.rating}</span>
                        <IconButton id = "arrows" onClick = {() => {decrease(selectedEntry.id, i)}}>
                            <KeyboardArrowDownIcon /> 
                        </IconButton>
                    </Stack>
                </Box>
                  </ListItem>
                </List>
            )))}
            </Box>
            { isCommenting && 
            (<form onSubmit={addComment}>
              <Box mb={2}>
                <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Comment</InputLabel>
                <TextField id="comment" name="comment" variant="outlined" fullWidth />
              </Box> 
              <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={handleComment}>Close</Button>
                <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} type="submit" >Submit</Button>
              </Box>
            </form> 
            )}
            <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} onClick={handleComment}>Comment</Button>
            <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={closeEntryModal}>Close</Button>
          </Modal>  
        </Box>
      </Box>
    </>
  );
};

export default Entries;