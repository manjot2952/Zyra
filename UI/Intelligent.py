#here we gonna use the advance model to generate the ouput .we use the openAI models such as  gpt-3.5-turbo or gpt-4-turb by using api key.
import cohere

def intelligentModel(user_input):
    try:
        query=user_input.lower()
        co = cohere.Client('API_KEY')  # Replace with your actual API key
        # Generate text
        response = co.generate(
            model='command-xlarge-nightly',
            prompt=query,
            max_tokens=100
        )
        return(response.generations[0].text)
    
    except Exception as e:
        print(e)
        return f"Error is coming . while trying to answer your question"


# response=intelligentModel("hello ! how are you")
# print(response)
