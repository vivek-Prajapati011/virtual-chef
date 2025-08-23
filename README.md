# Virtual Chef

A React application that generates recipes based on available ingredients using Hugging Face's AI models.

## Features

- Add ingredients to your list
- Generate AI-powered recipes when you have 4+ ingredients
- Clean and intuitive user interface

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Hugging Face Token

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or sign in
3. Go to your profile settings
4. Navigate to "Access Tokens"
5. Create a new token with "read" permissions
6. Copy the token

### 3. Configure Environment Variables

1. In the root directory, you'll find a `.env` file
2. Replace `your_hugging_face_token_here` with your actual token:

```env
VITE_HUGGING_FACE_TOKEN=hf_your_actual_token_here
```

**Important:** Never commit your actual token to version control!

### 4. Start the Development Server

```bash
npm run dev
```

## How to Use

1. Add ingredients to your list using the input field
2. Once you have 4 or more ingredients, click "Get recipe"
3. The AI will generate a recipe based on your available ingredients
4. View the generated recipe below the ingredients list

## Troubleshooting

### Common Issues:

1. **"Please set your Hugging Face API token" error**
   - Make sure you've updated the `.env` file with your actual token
   - Restart the development server after updating the `.env` file

2. **API request fails**
   - Check if your token is valid and has the correct permissions
   - Ensure you have an active internet connection
   - Verify the token format starts with `hf_`

3. **Recipe generation is slow**
   - The AI model may take a few seconds to generate responses
   - This is normal behavior for AI-powered text generation

## Technologies Used

- React 19
- Vite
- Axios for API calls
- Hugging Face Inference API
- CSS for styling

## API Details

The application uses Hugging Face's GPT-2 model for recipe generation. The API call includes:
- A prompt describing the available ingredients
- Parameters for controlling output length and creativity
- Proper authentication using your API token
