var regex_emph        = /[\_\*](.*)[\_\*]/
var regex_bold        = /[\_\*]{2}(.*)[\_\*]{2}/
var regex_bold_emph   = /[\_\*]{3}(.*)[\_\*]{3}/
var regex_headline_1  = /^#\s.*$/
var regex_headline_2  = /^#{2}\s.*$/
var regex_headline_3  = /^#{3}\s.*$/
var regex_headline_4  = /^#{4}\s.*$/
var regex_list        = /^\*\s.*$/
var regex_sublist     = /^\s{4}\*\s.*$/
var regex_headline_1s = /^={2,}$/
var regex_headline_2s = /^-{2,}$/
var regex_ordered_list= /^\d{1,4}\.\s.*$/
var regex_ol_removal  = /^\d{1,4}\.\s/
var regex_code        = /^\s{4}.*$/
var regex_inline_code = /`(.*)`/
var regex_quote       = /^&gt;\s.*$/
var regex_quote_tex   = /^>\s.*$/
