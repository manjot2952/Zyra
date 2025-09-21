import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from brain.Brain import Model
def model(userInput):
    query = userInput.lower()
    if "go to sleep" in query:
        return ("Ok sir , You can me call anytime")
    
                
    elif "hello" in query:#Greet Me Function 
        return ("Hello sir, how are you ?")
    
    elif "i am fine" in query:
        return ("that's great, sir")
                
    elif "how are you" in query:
        return ("Perfect, sir")
                
    elif "thank you" in query:
        return ("you are welcome, sir")
                
    else:
        return Model(query)
