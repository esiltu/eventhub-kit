import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { jwtDecode } from 'jwt-decode';
import { storage } from 'store/storage';
import moment from 'moment-timezone';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const loadUserAndMessages = async () => {
            try {
                const token = await storage.getString('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    setUserInfo(decoded);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }

            const amsterdamTime = moment().tz("Europe/Amsterdam").toDate();

            setMessages([
                {
                    _id: 2,
                    text: 'Chat nu met onze live en snel over hulp of een opdracht! 😊',
                    createdAt: amsterdamTime,
                    user: {
                        _id: 2,
                        name: 'Assistent',
                    },
                },
                {
                    _id: 1,
                    text: 'Hallo ontwikkelaar, hoe kan ik je vandaag helpen?',
                    createdAt: amsterdamTime,
                    user: {
                        _id: 2,
                        name: 'Assistent',
                    },
                },
            ]);
        };

        loadUserAndMessages();
    }, []);

    const onSend = useCallback((messages = []) => {
        const amsterdamTime = moment().tz("Europe/Amsterdam").toDate();
        const newMessages = messages.map(msg => ({
            ...msg,
            createdAt: amsterdamTime,
        }));
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        console.log(newMessages); // Logging out the sent messages
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                        name: userInfo.fullname || 'Onbekende Gebruiker'
                    }}
                    placeholder="Typ een bericht..."
                    alwaysShowSend
                    scrollToBottom
                    showUserAvatar={false}
                    inverted={false}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
