const lower_case_words:string[] = ['the', 'an', 'a', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'of', 'in'];

// This changes case, trims() and possibly adds spaces (eg B&Q becomes B & Q) 
// otherwise no characters are removed.
 export module TitleCaser {

    function split_to_parts (raw_text:string):string[] {
        return raw_text.replace(/&/g, ' & ').replace(/ {2,}/g, ' ').trim().split(' ');
    }
    
    function title_case(text:string, force:boolean) {
        const lower_text = text.toLowerCase();
        if (lower_case_words.includes(lower_text) && !force) {
            return lower_text;
        } else {
            return lower_text.substring(0,1).toUpperCase() + lower_text.substring(1);
        }
    }

    export function process(text:string):string {
        if (text) {
            const parts = split_to_parts(text);
            let part_index = -1;

            const final_parts = parts.map(item => {
                part_index++;
                if (item.toLowerCase().startsWith('mc')) {
                    return 'Mc' + title_case(item.substring(2), true);
                } else if (item.toLowerCase().startsWith('mac')) {
                    return 'Mac' + title_case(item.substring(3), true);
                } else {
                    return title_case(item, part_index == 0); // Force capitalisation of first word
                }
            });

            return final_parts.join(' ');
        }

        return text;
    }

}