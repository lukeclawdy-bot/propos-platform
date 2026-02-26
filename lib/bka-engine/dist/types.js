"use strict";
/**
 * BKA/NKA Calculator Engine - Type Definitions
 * Based on §2 BetrKV (BetrKV = Betriebskostenverordnung)
 *
 * This module defines all types for German Nebenkostenabrechnung (BKA/NKA)
 * compliant with German tenancy law (BGB §556, §556a, BetrKV §2)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUmlagefaehigeCategories = exports.DefaultAllocationKeys = exports.AllocationKeyLabels = exports.AllocationKey = exports.BKACostCategoryLabels = exports.BKACostCategory = void 0;
exports.isUmlagefaehig = isUmlagefaehig;
/**
 * §2 BetrKV Cost Categories (1-19)
 * Source: Verordnung über die Umlage der Kosten für die Versorgung mit Wärme und Warmwasser
 * and Betriebskostenverordnung §2
 */
var BKACostCategory;
(function (BKACostCategory) {
    // Category 1: Betriebsstrom (Geh-, Treppen- und Straßenbeleuchtung)
    BKACostCategory["BETRIEBSSTROM"] = "BETRIEBSSTROM";
    // Category 2: Wasserversorgung
    BKACostCategory["WASSERVERSORGUNG"] = "WASSERVERSORGUNG";
    // Category 3: Entwässerung
    BKACostCategory["ENTWAESSERUNG"] = "ENTWAESSERUNG";
    // Category 4: Heizung (including heating maintenance)
    BKACostCategory["HEIZUNG"] = "HEIZUNG";
    // Category 5: Warmwasserversorgung
    BKACostCategory["WARMWASSER"] = "WARMWASSER";
    // Category 6: Aufzug
    BKACostCategory["AUFZUG"] = "AUFZUG";
    // Category 7: Straßenreinigung und Müllbeseitigung
    BKACostCategory["MUELLBeseITIGUNG"] = "MUELLBeseITIGUNG";
    // Category 8: Geh- und Straßenreinigung
    BKACostCategory["STRASSENREINIGUNG"] = "STRASSENREINIGUNG";
    // Category 9: Gartenpflege
    BKACostCategory["GARTENPFLEGE"] = "GARTENPFLEGE";
    // Category 10: Beleuchtung
    BKACostCategory["BELEUCHTUNG"] = "BELEUCHTUNG";
    // Category 11: Schornsteinreinigung
    BKACostCategory["SCHORNSTEINREINIGUNG"] = "SCHORNSTEINREINIGUNG";
    // Category 12: Sach- und Haftpflichtversicherung
    BKACostCategory["VERSICHERUNG"] = "VERSICHERUNG";
    // Category 13: Hausmeister
    BKACostCategory["HAUSMEISTER"] = "HAUSMEISTER";
    // Category 14: Allgemeine Instandhaltung (Building maintenance)
    BKACostCategory["INSTANDHALTUNG"] = "INSTANDHALTUNG";
    // Category 15: Instandsetzung (Repairs)
    BKACostCategory["INSTANDSETZUNG"] = "INSTANDSETZUNG";
    // Category 16: Schönheitsreparaturen
    BKACostCategory["SCHOENHEITSREPARATUREN"] = "SCHOENHEITSREPARATUREN";
    // Category 17: Gemeinschaftlicher Fernseh- und Rundfunkempfang
    BKACostCategory["TV_EMPFANG"] = "TV_EMPFANG";
    // Category 18: Kosten der Vermietung (Leasing costs - only for commercial)
    BKACostCategory["VERMIETUNGSKOSTEN"] = "VERMIETUNGSKOSTEN";
    // Category 19: Sonstige Betriebskosten nach Mietvertrag
    BKACostCategory["SONSTIGE_KOSTEN"] = "SONSTIGE_KOSTEN";
})(BKACostCategory || (exports.BKACostCategory = BKACostCategory = {}));
/**
 * German labels for cost categories
 */
exports.BKACostCategoryLabels = {
    [BKACostCategory.BETRIEBSSTROM]: 'Betriebsstrom (§2 Nr. 1 BetrKV)',
    [BKACostCategory.WASSERVERSORGUNG]: 'Wasserversorgung (§2 Nr. 2 BetrKV)',
    [BKACostCategory.ENTWAESSERUNG]: 'Entwässerung (§2 Nr. 3 BetrKV)',
    [BKACostCategory.HEIZUNG]: 'Heizung (§2 Nr. 4 BetrKV)',
    [BKACostCategory.WARMWASSER]: 'Warmwasserversorgung (§2 Nr. 5 BetrKV)',
    [BKACostCategory.AUFZUG]: 'Aufzug (§2 Nr. 6 BetrKV)',
    [BKACostCategory.MUELLBeseITIGUNG]: 'Müllbeseitigung (§2 Nr. 7 BetrKV)',
    [BKACostCategory.STRASSENREINIGUNG]: 'Geh- und Straßenreinigung (§2 Nr. 8 BetrKV)',
    [BKACostCategory.GARTENPFLEGE]: 'Gartenpflege (§2 Nr. 9 BetrKV)',
    [BKACostCategory.BELEUCHTUNG]: 'Beleuchtung (§2 Nr. 10 BetrKV)',
    [BKACostCategory.SCHORNSTEINREINIGUNG]: 'Schornsteinreinigung (§2 Nr. 11 BetrKV)',
    [BKACostCategory.VERSICHERUNG]: 'Sach- und Haftpflichtversicherung (§2 Nr. 12 BetrKV)',
    [BKACostCategory.HAUSMEISTER]: 'Hausmeister (§2 Nr. 13 BetrKV)',
    [BKACostCategory.INSTANDHALTUNG]: 'Allgemeine Instandhaltung (§2 Nr. 14 BetrKV)',
    [BKACostCategory.INSTANDSETZUNG]: 'Instandsetzung (§2 Nr. 15 BetrKV)',
    [BKACostCategory.SCHOENHEITSREPARATUREN]: 'Schönheitsreparaturen (§2 Nr. 16 BetrKV)',
    [BKACostCategory.TV_EMPFANG]: 'Gemeinschaftlicher TV/Rundfunkempfang (§2 Nr. 17 BetrKV)',
    [BKACostCategory.VERMIETUNGSKOSTEN]: 'Kosten der Vermietung (§2 Nr. 18 BetrKV)',
    [BKACostCategory.SONSTIGE_KOSTEN]: 'Sonstige Betriebskosten (§2 Nr. 19 BetrKV)'
};
/**
 * Allowed allocation keys for cost distribution
 * Source: §556a BGB (Verteilungsmaßstäbe)
 */
var AllocationKey;
(function (AllocationKey) {
    /** Distribution by living space (Wohnfläche) - §556a Abs. 1 S. 1 BGB */
    AllocationKey["WOHNFLAECHE"] = "WOHNFLAECHE";
    /** Distribution by number of persons (Personenzahl) - §556a Abs. 1 S. 2 BGB */
    AllocationKey["PERSONENZAHL"] = "PERSONENZAHL";
    /** Distribution by consumption (Verbrauch) - §556a Abs. 1 S. 4 BGB */
    AllocationKey["VERBRAUCH"] = "VERBRAUCH";
    /** Distribution per unit (Wohneinheit) */
    AllocationKey["EINHEIT"] = "EINHEIT";
})(AllocationKey || (exports.AllocationKey = AllocationKey = {}));
/**
 * German labels for allocation keys
 */
exports.AllocationKeyLabels = {
    [AllocationKey.WOHNFLAECHE]: 'nach Wohnfläche (§556a Abs. 1 S. 1 BGB)',
    [AllocationKey.PERSONENZAHL]: 'nach Personenzahl (§556a Abs. 1 S. 2 BGB)',
    [AllocationKey.VERBRAUCH]: 'nach Verbrauch (§556a Abs. 1 S. 4 BGB)',
    [AllocationKey.EINHEIT]: 'nach Wohneinheit'
};
/**
 * Default allocation keys per cost category (customizable by contract)
 * Based on common practice and BetrKV guidelines
 */
exports.DefaultAllocationKeys = {
    [BKACostCategory.BETRIEBSSTROM]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.WASSERVERSORGUNG]: AllocationKey.VERBRAUCH,
    [BKACostCategory.ENTWAESSERUNG]: AllocationKey.VERBRAUCH,
    [BKACostCategory.HEIZUNG]: AllocationKey.VERBRAUCH,
    [BKACostCategory.WARMWASSER]: AllocationKey.VERBRAUCH,
    [BKACostCategory.AUFZUG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.MUELLBeseITIGUNG]: AllocationKey.PERSONENZAHL,
    [BKACostCategory.STRASSENREINIGUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.GARTENPFLEGE]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.BELEUCHTUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.SCHORNSTEINREINIGUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.VERSICHERUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.HAUSMEISTER]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.INSTANDHALTUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.INSTANDSETZUNG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.SCHOENHEITSREPARATUREN]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.TV_EMPFANG]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.VERMIETUNGSKOSTEN]: AllocationKey.WOHNFLAECHE,
    [BKACostCategory.SONSTIGE_KOSTEN]: AllocationKey.WOHNFLAECHE
};
/**
 * Non-umlagefähige (non-allocable) cost categories per §2 BetrKV
 * These costs CANNOT be passed to tenants
 */
exports.NonUmlagefaehigeCategories = [
// Verwaltungskosten (management costs) are NOT umlagefähig
// These must be paid by the landlord
];
/**
 * Check if a cost category is umlagefähig (allocable to tenants)
 * All §2 BetrKV categories are generally umlagefähig
 * unless specifically excluded by law
 */
function isUmlagefaehig(category) {
    // Management/Verwaltungskosten are NOT in BetrKV §2
    // If they were they'd be flagged here
    return !exports.NonUmlagefaehigeCategories.includes(category);
}
