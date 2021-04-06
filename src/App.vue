<template>
	<div id="app">
		<Navbar />
		<form>
			<textarea
				class="uk-textarea"
				v-vk-height-viewport.expand
				@input="count"
				v-model="text"
			></textarea>
		</form>
		<div>
			<vk-button type="primary" class="uk-width-1-2" @click="copyText">
				<vk-icon icon="copy"></vk-icon>
				Copy
			</vk-button>
			<vk-button type="danger" class="uk-width-1-2" @click="cleanText">
				<vk-icon icon="trash"></vk-icon>
				Clean
			</vk-button>
		</div>

		<vk-table :data="counter" striped>
			<vk-table-column cell="title"></vk-table-column>
			<vk-table-column cell="number"></vk-table-column>
		</vk-table>
		<vk-notification
			position="bottom-center"
			:messages.sync="messages"
		></vk-notification>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Countable from "countable";

	export default {
		name: "App",
		data() {
			return {
				text: "",
				messages: [],
				counter: [
					{ title: "Paragraphs", number: 0, name: "paragraphs" },
					{ title: "Sentences", number: 0, name: "sentences" },
					{ title: "Words", number: 0, name: "words" },
					{ title: "Characters", number: 0, name: "characters" },
					{
						title: "Characters (with spaces)",
						number: 0,
						name: "all",
					},
				],
			};
		},
		components: {
			Navbar,
		},
		methods: {
			count() {
				Countable.count(this.text, (ctr) => {
					this.counter.forEach((element) => {
						element.number = ctr[element.name];
					});
				});
			},
			copyText() {
				navigator.clipboard.writeText(this.text);
				this.messages.push({
					message: "Copied to clipboard!",
					status: "success",
				});
			},
			cleanText() {
				this.text = "";
				this.counter.forEach((element) => {
					element.number = 0;
				});
				this.messages.push({
					message: "Text deleted!",
					status: "danger",
				});
			},
		},
	};
</script>
