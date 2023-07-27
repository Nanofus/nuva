import { HtmlValidate } from 'html-validate';

export const validateHTML = async (html: string) => {
	const htmlValidate = new HtmlValidate({
		extends: ['html-validate:standard']
	});
	return htmlValidate.validateString(html);
};
