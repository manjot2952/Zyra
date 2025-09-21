#this model inlude the if-else condition as if the user input have such query then do this else do like .
import datetime
import os
import random
import webbrowser
from bs4 import BeautifulSoup
import pyautogui
import pyttsx3
import requests
import speech_recognition 
import mixer
from notifypy import Notify
import speedtest
import sys
import os
from AppOpener import open,close


engine = pyttsx3.init("sapi5")
voices = engine.getProperty("voices")
engine.setProperty("voice", voices[0].id)
rate = engine.setProperty("rate",170)

def voiceSpeak(audio):#Speak Function 
    engine.say(audio)
    engine.runAndWait()

def textSpeak(text):
    print(f"Zyra Speak : {text}")
   

def hybridSpeak(text):
    voiceSpeak(text)
    textSpeak(text)

def alarm(query):
    timehere = open("Alarmtext.txt","a")
    timehere.write(query)
    timehere.close()
    os.startfile("alarm.py")

def dyanamicModel(UserInput):
    query = UserInput.lower()
    if "go to sleep" in query:
        return ("Ok sir , You can me call anytime")
    
                
    elif "hello" in query:#Greet Me Function 
        return ("Hello sir, how are you ?")
    
    elif "i am fine" in query:
        return ("that's great, sir")
    
    elif "Who are you" in query:
        return " I am Zyra . A virtual assistant for you . How can i help you"
                
    elif "how are you" in query:
        return ("Perfect, sir")
    
    elif "who is your mentor" in query:
        return ("Our mentor is jaswinder sir .")
                
    elif "thank you" in query:
        return ("you are welcome, sir")

    # elif "google" in query:
    #  from SearchNow import searchGoogle
    #  searchGoogle(query)
                
    # elif "youtube" in query:
    #  from SearchNow import searchYoutube
    #  searchYoutube(query)
                
    # elif "wikipedia" in query:
    #  webbrowser.open("https://wwww.google.com")
    #  from SearchNow import searchWikipedia
    #  searchWikipedia(query)

    elif "temperature" in query:
        search = "temperature in Mohali"
        url = f"https://www.google.com/search?q={search}"
        r  = requests.get(url)
        data = BeautifulSoup(r.text,"html.parser")
        temp = data.find("div", class_ = "BNeawe").text         
        return (f"current{search} is {temp}")

    elif "weather" in query:
        search = "temperature in punjab"
        url = f"https://www.google.com/search?q={search}"
        r  = requests.get(url)
        data = BeautifulSoup(r.text,"html.parser")
        temp = data.find("div", class_ = "BNeawe").text
        return (f"current{search} is {temp}")


    elif "the time" in query:
        strTime = datetime.datetime.now().strftime("%H:%M")    
        return (f"Sir, the time is {strTime}")
                
    elif "finally sleep" in query:
        voiceSpeak("Going to sleep,sir")
        exit()

    # elif "open" in query:
    #  from Dictapp import openappweb
    #  openappweb(query)
    # elif "close" in query:
    #  from Dictapp import closeappweb
    #  closeappweb(query)


    elif "set an alarm" in query:
        print("input time example:- 10 and 10 and 10")
        voiceSpeak("Set the time")
        a = input("Please tell the time :- ")
        alarm(a)
        return ("Done,sir")

    elif "pause" in query:
        pyautogui.press("k")
        return ("video paused")
                
    elif "play" in query:
        pyautogui.press("k")
        return ("video played")
                
    elif "mute" in query:
        pyautogui.press("m")
        return ("video muted")

    elif "volume up" in query:
        from volume_control import volumeup  # import your function
        volumeup()
        return ("Turning volume up, sir")
        
    elif "volume down" in query:
        from volume_control import volumedown
        volumedown()
        return ("Turning volume down, sir")
        

    elif "remember that" in query:
        rememberMessage = query.replace("remember that","")
        rememberMessage = query.replace("jarvis","")
        voiceSpeak("You told me to remember that"+rememberMessage)
        remember = open("Remember.txt","a")
        remember.write(rememberMessage)
        remember.close()
                
    elif "what do you remember" in query:
        remember = open("Remember.txt","r")
        return ("You told me to remember that" + remember.read())


    elif "tired" in query:
        voiceSpeak("Playing your favourite songs, sir")
        a = (1,2,3) # You can choose any number of songs (I have only choosen 3)
        b = random.choice(a)
        if b==1:
            webbrowser.open('https://www.youtube.com/watch?v=d2ofxg8pHfQ')

    # elif "news" in query:
    #     from NewsRead import latestnews
    #     latestnews()

    # elif "calculate" in query:
    #     from Calculatenumbers import WolfRamAlpha
    #     from Calculatenumbers import Calc
    #     query = query.replace("calculate","")
    #     query = query.replace("jarvis","")
    #     Calc(query)


    # elif "whatsapp" in query:
    #     from Whatsapp import sendMessage
    #     sendMessage()

    elif "shutdown the system" in query:
        voiceSpeak("Are You sure you want to shutdown")
        shutdown = input("Do you wish to shutdown your computer? (yes/no)")
        if shutdown == "yes":
            os.system("shutdown /s /t 1")

        
    elif "change password" in query:
        voiceSpeak ("What's the new password")
        new_pw = input("Enter the new password\n")
        new_password = open("password.txt","w")
        new_password.write(new_pw)
        new_password.close()
        voiceSpeak ("Done sir")
        return (f"Your new password is{new_pw}")


    elif "schedule my day" in query:
        tasks = [] #Empty list 
        print("Do you want to clear old tasks (Preturn  YES or NO)")
        query = input.lower()
        if "yes" in query:
            file = open("tasks.txt","w")
            file.write(f"")
            file.close()
            no_tasks = int(input("Enter the no. of tasks :- "))
            i = 0
        for i in range(no_tasks):
            tasks.append(input("Enter the task :- "))
            file = open("tasks.txt","a")
            file.write(f"{i}. {tasks[i]}\n")
            file.close()
                    
    elif "no" in query:
        i = 0
        no_tasks = int(input("Enter the no. of tasks :- "))
        for i in range(no_tasks):
            tasks.append(input("Enter the task :- "))
            file = open("tasks.txt","a")
            file.write(f"{i}. {tasks[i]}\n")
            file.close()

    elif "show my schedule" in query:
        file = open("tasks.txt","r")
        content = file.read()
        file.close()
        mixer.init()
        mixer.music.load("notification.mp3")
        mixer.music.play()
        notification = Notify(
            title = "My schedule :-",
            message = content,
            timeout = 15
            )
                    
                

    elif "start" in query:   #EASY METHOD
        query = query.replace("start","")
        query = query.replace("jarvis","")
        pyautogui.press("super")
        pyautogui.typewrite(query)
        pyautogui.sleep(2)
        pyautogui.press("enter")

                
    elif "internet speed" in query:
        wifi  = speedtest.Speedtest()
        upload_net = wifi.upload()/1048576         #Megabyte = 1024*1024 Bytes
        download_net = wifi.download()/1048576
        print("Wifi Upload Speed is", upload_net)
        print("Wifi download speed is ",download_net)
        voiceSpeak (f"Wifi download speed is {download_net}")
        voiceSpeak (f"Wifi Upload speed is {upload_net}")

    # elif "ipl score" in query:
    #     from plyer import notification  #pip install plyer
    #     import requests #pip install requests
    #     from bs4 import BeautifulSoup #pip install bs4
    #     url = "https://www.cricbuzz.com/"
    #     page = requests.get(url)
    #     soup = BeautifulSoup(page.text,"html.parser")
    #     team1 = soup.find_all(class_ = "cb-ovr-flo cb-hmscg-tm-nm")[0].get_text()
    #     team2 = soup.find_all(class_ = "cb-ovr-flo cb-hmscg-tm-nm")[1].get_text()
    #     team1_score = soup.find_all(class_ = "cb-ovr-flo")[8].get_text()
    #     team2_score = soup.find_all(class_ = "cb-ovr-flo")[10].get_text()

    #     a = print(f"{team1} : {team1_score}")
    #     b = print(f"{team2} : {team2_score}")

    #     notification.notify(
    #         title = "IPL SCORE :- ",
    #         message = f"{team1} : {team1_score}\n {team2} : {team2_score}",
    #         timeout = 15
    #     )


    elif "screenshot" in query:
        import pyautogui #pip install pyautogui
        im = pyautogui.screenshot()
        im.save("ss.jpg")

                
    elif "click my photo" in query:#HOPE YOU LIKED IT 
        pyautogui.press("super")
        pyautogui.typewrite("camera")
        pyautogui.press("enter")
        pyautogui.sleep(2)
        hybridSpeak ("SMILE")
        pyautogui.press("enter")


    elif "focus mode" in query:
        a = int(input("Are you sure that you want to enter focus mode :- [1 for YES / 2 for NO "))
        if (a==1):
            hybridSpeak("Entering the focus mode....")
            os.startfile("D:\\Coding\\Youtube\\Jarvis\\FocusMode.py")
            exit()

    elif "open app" in query:
        app=input("Enter the name of appliction to open: ").strip().lower()
        open(app)
    
    elif "close app" in query:
        app=input("Enter the name of appliction to close: ").strip().lower()
        close(app)
    else:
        return mediumModel(query)



# output=dyanamicModel("Hello")  
# print(f"model output : {output}")
if __name__== "__main__":
    output=dyanamicModel("close app")
    print(f"model output : {output}")


                