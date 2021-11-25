import * as React from 'react';
export declare type NotificationItemProps = {
    notificationTitle: string | undefined;
    notificationBody: string | undefined;
    cta: string | undefined;
    app: string | undefined;
    icon: string | undefined;
    image: string | undefined;
    url: string | undefined;
};
declare const ViewNotificationItem: React.FC<NotificationItemProps>;
export default ViewNotificationItem;
