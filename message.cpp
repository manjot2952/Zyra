#include <winrt/Windows.UI.Notifications.Management.h>
#include <iostream>

using namespace winrt;
using namespace Windows::UI::Notifications::Management;

int main() {
    init_apartment();
    UserNotificationListener listener = UserNotificationListener::Current();

    auto status = listener.RequestAccessAsync().get();
    if (status != UserNotificationListenerAccessStatus::Allowed) {
        std::wcout << L"Access Denied!" << std::endl;
        return 1;
    }

    std::wcout << L"Listening for notifications..." << std::endl;
    while (true) {
        auto notifications = listener.GetNotificationsAsync().get();
        for (auto notification : notifications) {
            std::wcout << L"App: " << notification.AppDisplayName().c_str() << std::endl;
        }
        Sleep(1000);
    }

    return 0;
}
