import { writable, derived, type Readable } from "svelte/store";

const TIMEOUT = 1000;

type MessageType = "default" | "error";
function createNotificationStore() {
	const _notifications = writable<{ type: MessageType; message: string; id: string }[]>([]);

	function send(message: string, type: MessageType = "default") {
		_notifications.update((state) => {
			return [...state, { id: id(), type, message }];
		});
	}

	const notifications: Readable<{ type: MessageType; message: string; id: string }[]> = derived(
		_notifications,
		($_notifications, set) => {
			set($_notifications);
			if ($_notifications.length > 0) {
				const timer = setTimeout(() => {
					_notifications.update((state) => {
						state.shift();
						return state;
					});
				}, TIMEOUT);
				return () => {
					clearTimeout(timer);
				};
			}
		}
	);
	const { subscribe } = notifications;

	return {
		subscribe,
		send,
		default: (msg: string) => send(msg, "default"),
		error: (msg: string) => send(msg, "error")
	};
}

function id() {
	return "_" + Math.random().toString(36).substring(2, 9);
}

export const notifications = createNotificationStore();
