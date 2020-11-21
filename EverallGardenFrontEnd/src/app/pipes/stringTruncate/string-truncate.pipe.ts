import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "stringTruncate",
})
export class StringTruncatePipe implements PipeTransform {
	transform(value: string, limit: number): string {
		if (!value) {
			return null;
		}
		let defaultLimit = 50;
		let actualLimit = limit ? limit : defaultLimit;
		let returnValue = value.slice(0, actualLimit + 1);
		if (value.length > actualLimit) {
			returnValue = returnValue + "...";
		}
		return returnValue;
	}
}
