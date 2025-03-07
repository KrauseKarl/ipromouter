import telebot
import os
import datetime
from celery import shared_task
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()

TOKEN_TG = os.getenv("TG_TOKEN")
CHAT_ID = os.getenv("TG_CHAT_ID")


def bot_init(token: str):
    bot = telebot.TeleBot(token)
    return bot


def send_order_to_tg_chat(bot, chat_id, message):
    bot.send_message(chat_id, message)


def send_order_to_telegram_chat_sync(data):
    # sync func to send message by telegram bot
    bot = bot_init(token=TOKEN_TG)
    chat_id = CHAT_ID
    try:
        send_order_to_tg_chat(bot, chat_id, message=data)
    except Exception as e:
        message = "ОШИБКА! не смог отправить данные по заказу."
        send_order_to_tg_chat(bot, chat_id, message)
        return f"ERROR {e}.Не смог отправить данные по заказу."
    return "OK. Message has been sent to Telegram"


@shared_task
def send_order_to_telegram_chat(data):
    # async func to send message by telegram bot
    bot = bot_init(token=TOKEN_TG)
    chat_id = CHAT_ID
    # name
    # email
    # telephone
    # subject
    # comments

    try:
        send_order_to_tg_chat(bot, chat_id, message=data)
    except Exception as e:
        message = "ОШИБКА! не смог отправить данные по заказу."
        send_order_to_tg_chat(bot, chat_id, message)
        return f"ERROR {e}.Не смог отправить данные по заказу."
    return "OK. Message has been sent to Telegram"
