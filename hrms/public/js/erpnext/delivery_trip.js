// Copyright (c) 2022, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Delivery Trip", {
	refresh: function(frm) {
		if (frm.doc.docstatus === 1 && frm.doc.employee) {
			frm.add_custom_button(__("Expense Claim"), function() {
				frappe.model.open_mapped_doc({
					method: "hrms.hr.doctype.expense_claim.expense_claim.make_expense_claim_for_delivery_trip",
					frm: frm,
				});
			}, __("Create"));
		}
		bulkPrintOption(frm);
	},
	setup: function(frm){
		bulkPrintOption(frm);
	},
	onload: function(frm){
		bulkPrintOption(frm);
	},
	bulk_print: function(frm) {
		open_url_post(
			'/api/method/erpnext.stock.doctype.delivery_trip.delivery_trip.generate_bulk_pdf',
			{
				docname: frm.doc.name
			}
		);
	},

})
function bulkPrintOption(frm){
	if (!frm.is_new())
		frm.add_custom_button(__('Print'), () => frm.events.bulk_print(frm));
}
