// the type for the the response of the input data to be parsed
export type ApiNotificationType =   {
    "payload_id": number,
    "channel": string,
    "epoch": string,
    "payload": {
        "apns": {
            "payload": {
                "aps": {
                    "category": string,
                    "mutable-content": number,
                    "content-available": number
                }
            },
            "fcm_options": {
                "image": string
            }
        },
        "data": {
            "app": string,
            "sid": string,
            "url": string,
            "acta": string,
            "aimg": string,
            "amsg": string,
            "asub": string,
            "icon": string,
            "type": string,
            "epoch": string,
            "appbot": string,
            "hidden": string,
            "secret": string
        },
        "android": {
            "notification": {
                "icon": string,
                "color": string,
                "image": string
                "default_vibrate_timings": boolean
            }
        },
        "notification": {
            "body": string,
            "title": string
        }
    },
    "blockchain": string
}

// The output response from parsing a notification object
export type ParsedResponseType = {
    cta : string,
    title: string,
    message: string,
    icon: string,
    url: string,
    sid: string,
    app: string,
    image: string,
    blockchain: string
}