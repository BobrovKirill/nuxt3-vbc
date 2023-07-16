interface FormType {
	type: string;
	isValid: Ref<boolean>;
	headerData: HeaderType;
	inputsData: InputType[];
	footerData: FooterType;
}

interface HeaderType {
	title: string;
	subtitle: string;
	text: string;
	email: string;
	link: string;
}

interface FooterType {
	button: string;
	text: string;
	link: { id: number; url: string; text: string };
}

interface InputType {
	id: number;
	type: string;
	label: string;
	name: string;
	placeholder: string;
	autocomplete: string;
	icon: string;
	required: boolean;
	valid: Ref<null | boolean>;
	links: LinkType[];
}

interface LinkType {
	id: number;
	url: string;
	text: string;
}

export { FormType, InputType, FooterType, HeaderType };
