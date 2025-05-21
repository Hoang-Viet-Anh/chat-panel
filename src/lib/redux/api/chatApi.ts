import { Chat } from '@/lib/redux/types/Chat';
import { Message } from '@/lib/redux/types/Message';
import { User } from '@/lib/redux/types/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnreadCounts } from '../types/UnreadCounts';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: 'include',
    }),
    tagTypes: ['chat', 'user', 'message', 'userList'],
    endpoints: (builder) => ({
        getAllChats: builder.query<{ chats: Chat[], users: User[], unreadCounts: UnreadCounts[] }, void>({
            query: () => '/chat',
            transformResponse: (response: { chats: Chat[], users: User[], unreadCounts: UnreadCounts[] }) => {
                const editedChats = response.chats.map(chat => {
                    if (chat.lastMessage?.timestamp !== undefined) {
                        chat.lastMessage.timestamp = new Date(chat.lastMessage?.timestamp!).toISOString();
                    }
                    return chat;
                })

                return {
                    chats: editedChats,
                    users: response.users,
                    unreadCounts: response.unreadCounts,
                }
            },
            providesTags: ['user', 'chat'],
        }),
        getChat: builder.query<{ messages: Message[], user: User }, string>({
            query: (chatId: string) => ({
                url: `/chat/${chatId}`,
                method: 'GET',
            }),
            transformResponse: ({ messages, user }: { messages: Message[], user: User }) => {
                const editedMessages = messages.map(message => {
                    message.createdAt = new Date(message.createdAt!).toISOString();
                    return message;
                })
                return {
                    messages: editedMessages,
                    user
                }
            },
            providesTags: (result, error, chatId) => [{ type: 'message', id: chatId }],
        }),
        sendMessage: builder.mutation<Message, any>({
            query: (message: Message) => ({
                url: `/chat/send/message`,
                method: 'POST',
                body: message,
            }),
            invalidatesTags: (result, error, { chatId }) => [{ type: 'message', id: chatId }, 'chat'],
        }),
        deleteChat: builder.mutation<User, string>({
            query: (chatId: string) => ({
                url: `/chat/${chatId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, chatId) => [{ type: 'message', id: chatId }, 'chat', 'user'],
        }),
        createChat: builder.mutation<void, string>({
            query: (userId: string) => ({
                url: `/chat/create/${userId}`,
                method: 'GET',
            }),
            invalidatesTags: ['chat'],
        }),
        enableAutoMessages: builder.mutation<any, void>({
            query: () => ({
                url: `/chat/automatic/enable`,
                method: 'GET',
            }),
        }),
        disableAutoMessages: builder.mutation<any, void>({
            query: () => ({
                url: `/chat/automatic/disable`,
                method: 'GET',
            }),
            invalidatesTags: ['chat', 'user'],
        }),
        // user api
        getMe: builder.query<User, void>({
            query: () => '/user/@me',
            providesTags: ['user'],
        }),
        getUsersList: builder.query<User[], string>({
            query: (filter) => `/user/list/${filter}`,
            providesTags: ['userList'],
        }),
        addBot: builder.mutation<User, User>({
            query: (user: User) => ({
                url: `/user/add`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['user', 'chat'],
        }),
        renameBot: builder.mutation<User, { user: User, userId: string, chatId: string }>({
            query: ({ user, userId }) => ({
                url: `/user/change`,
                method: 'POST',
                body: {
                    ...user,
                    userId
                },
            }),
            invalidatesTags: (result, error, { chatId }) => ['user', 'userList', { type: 'message', id: chatId }],
        }),
    }),

});

export const {
    useGetAllChatsQuery, useGetChatQuery, useSendMessageMutation,
    useDeleteChatMutation, useEnableAutoMessagesMutation, useDisableAutoMessagesMutation,
    useCreateChatMutation, useGetUsersListQuery, useGetMeQuery, useAddBotMutation,
    useRenameBotMutation
} = chatApi;