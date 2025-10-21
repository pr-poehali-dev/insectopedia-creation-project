'''
Business: Отправка сообщения обратной связи с цензурой матерных слов
Args: event с httpMethod, body содержит email, subject, message
Returns: Успешное сохранение или ошибка
'''

import json
import os
import re
from typing import Dict, Any
from datetime import datetime
import psycopg2

PROFANITY_WORDS = [
    'блять', 'бля', 'хуй', 'хер', 'пизд', 'ебл', 'ебан', 'ебат', 'сука', 'сучк',
    'пидор', 'пидар', 'хуес', 'хуев', 'пиздец', 'охуе', 'ахуе', 'заеб', 'уеб',
    'fuck', 'shit', 'bitch', 'ass', 'dick', 'cock', 'pussy', 'cunt', 'damn'
]

def censor_text(text: str) -> str:
    censored = text
    for word in PROFANITY_WORDS:
        pattern = re.compile(re.escape(word), re.IGNORECASE)
        censored = pattern.sub('***', censored)
    return censored

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    email = body_data.get('email', '').strip()
    subject = body_data.get('subject', '').strip()
    message = body_data.get('message', '').strip()
    
    if not email or not subject or not message:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Все поля обязательны для заполнения'}),
            'isBase64Encoded': False
        }
    
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный формат email'}),
            'isBase64Encoded': False
        }
    
    censored_subject = censor_text(subject)
    censored_message = censor_text(message)
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration error'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO contact_messages (email, subject, message, created_at, is_read) VALUES (%s, %s, %s, %s, %s)",
        (email, censored_subject, censored_message, datetime.now().isoformat(), False)
    )
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Сообщение успешно отправлено'}),
        'isBase64Encoded': False
    }
