import pandas as pd
import random
import openai
from Intelligent import intelligentModel
gpt_model = openai.Completion  

df = pd.read_csv('utilities\\dataset.csv')  

commands = df['Text'].tolist()  
responses = df['Answer'].tolist()  

def predictionModel(input_command):
    input_command_clean = input_command.strip().lower()  
    matches = [responses[i] for i, command in enumerate(commands) if command.strip().lower() == input_command_clean]
    if matches:
        return random.choice(matches)
    else:
        return None  


def mediumModel(input_command):
    best_match = predictionModel(input_command)
    
    if best_match:
       return best_match  
    else:
        return intelligentModel(input_command)



# response = mediumModel("hello")
# print(response)
