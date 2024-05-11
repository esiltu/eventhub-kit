import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat, Send, Bubble, QuickReplies, SystemMessage } from 'react-native-gifted-chat';
import { jwtDecode } from 'jwt-decode';
import { storage } from 'store/storage';
import moment from 'moment-timezone';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        async function loadUserAndMessages() {
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
                    user: { _id: 2, name: 'Assistent' },
                    system: true,
                },
                {
                    _id: 1,
                    text: 'Hallo flex-werker, hoe kan ik je vandaag helpen?',
                    createdAt: amsterdamTime,
                    user: { _id: 2, name: 'Assistent' },
                    system: true,
                },
            ]);
        }

        loadUserAndMessages();
    }, []);

    const onSend = useCallback((newMessages = []) => {
        const amsterdamTime = moment().tz("Europe/Amsterdam").toDate();
        newMessages.forEach(message => {
            console.log(`Message sent by ${userInfo.fullname || 'Onbekende Gebruiker'}: ${message.text}`);
        });
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages.map(msg => ({
            ...msg,
            createdAt: amsterdamTime,
            user: { _id: 1, name: userInfo.fullname || 'Onbekende Gebruiker' },
        }))));
        setIsTyping(false);
    }, [userInfo.fullname]);

    const renderSend = (props) => (
        <Send {...props}>
            <View style={styles.sendButton}>
                <Text style={styles.sendText}>Verstuur</Text>
            </View>
        </Send>
    );

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: { backgroundColor: '#007bff' },
                left: { backgroundColor: '#f0f0f0' }
            }}
            textStyle={{
                right: { color: '#fff' },
                left: { color: '#000' }
            }}
        />
    );

    const renderQuickReplies = (props) => (
        <QuickReplies
            {...props}
            onQuickReply={(reply) => console.log('Selected quick reply:', reply)}
            quickReplyStyle={{ backgroundColor: '#007bff' }}
            textStyle={{ color: '#fff' }}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{ _id: 1, name: userInfo.fullname || 'Onbekende Gebruiker' }}
                    placeholder="Typ een bericht..."
                    alwaysShowSend
                    scrollToBottom
                    isTyping={isTyping}
                    showUserAvatar={false}
                    renderSend={renderSend}
                    renderBubble={renderBubble}
                    renderQuickReplies={renderQuickReplies}
                    inverted={false}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sendButton: {
        marginBottom: 5,
        marginRight: 10,
        bottom: '20%',
    },
    sendText: {
        fontSize: 18,
        color: '#007bff'
    }
});

export default ChatPage;
