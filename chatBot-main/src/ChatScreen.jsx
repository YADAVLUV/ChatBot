import React, { useState, useRef } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import OpenAI from "openai"; // Use OpenAI SDK
import { OPENAI_API_KEY } from '@env';


const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Needed for React Native
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      });

      setMessages((prevMessages) => [...prevMessages, response.choices[0].message]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [...prevMessages, { role: "bot", content: "Oops! Something went wrong." }]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }}
      >
        {messages.map((msg, index) => (
          <Text key={index} style={{ marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{msg.role === "user" ? "You" : "Bot"}:</Text> {msg.content}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
