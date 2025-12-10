"""
Test Framework Tikun: RBU ONU 1% - CON BINAH SIGMA FORZADO
===========================================================

Este test es IDÉNTICO a test_rbu_onu_modern.py pero FUERZA el uso de BinahSigma
para análisis multi-civilizacional Occidente vs Oriente.

DIFERENCIA CLAVE:
- test_rbu_onu_modern.py: Usa Binah estándar (auto-detection no funciona en orchestrator)
- test_rbu_onu_sigma.py: FUERZA BinahSigma manualmente

CASO IDEAL PARA BINAH SIGMA:
Este caso es PERFECTO para análisis multi-civilizacional porque:
- Occidente (OTAN): Posible apoyo a redistribución global, valores humanitarios
- Oriente (China/Rusia): Rechazo a imposición occidental en gasto militar, soberanía
- Tensión geopolítica máxima: Nueva Guerra Fría, bloques incompatibles

Esperamos ver:
- bias_delta > 50% (alta divergencia Occidente vs Oriente)
- west_blind_spots: Ignora preocupaciones soberanía, asume valores universales
- east_blind_spots: Subestima sufrimiento humano, prioriza estabilidad sobre justicia

Arquitectura: TikunOrchestrator + BinahSigma FORZADO
Autor: Framework Tikun V2.0
Fecha: 2025-12-07
"""

import sys
import os
import io
from datetime import datetime
from pathlib import Path

# Fix encoding for Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent))

from tikun_orchestrator import TikunOrchestrator
from sefirot.binah_sigma import BinahSigma  # Import BinahSigma


def print_section(title: str, char: str = "="):
    """Print formatted section header"""
    print("\n" + char * 100)
    print(f"  {title}")
    print(char * 100)


def main():
    """
    Test completo RBU ONU con BinahSigma FORZADO
    """

    print_section("FRAMEWORK TIKUN - TEST RBU ONU 1% + BINAH SIGMA FORZADO", "=")
    print("🌍 Análisis ético completo con 10 Sefirot")
    print("⚡ BinahSigma FORZADO para análisis multi-civilizacional")
    print("💰 Caso: Renta Básica Universal financiada con 1% gasto militar global")
    print(f"📅 Timestamp: {datetime.now().isoformat()}")
    print()

    # Versículo
    print("═" * 100)
    print("דברים טו:יא - Devarim 15:11")
    print("פָּתֹחַ תִּפְתַּח אֶת־יָדְךָ לְאָחִיךָ לַעֲנִיֶּךָ וּלְאֶבְיֹנְךָ בְּאַרְצֶךָ")
    print('"Abre generosamente tu mano a tu hermano, al pobre y al necesitado"')
    print("═" * 100)
    print()

    # ==============================================================================
    # DEFINICIÓN DEL CASO (Idéntico a test_rbu_onu_modern.py)
    # ==============================================================================

    scenario = """
PROPUESTA CONCRETA:
Implementar un sistema de Renta Básica Universal (RBU) global financiado mediante
la reasignación del 1% del presupuesto de defensa militar de todos los países
miembros de la Organización de las Naciones Unidas (ONU).

OBJETIVO:
- Reducir pobreza extrema global (700 millones de personas)
- Crear red de seguridad económica mínima universal
- Canalizar recursos de guerra hacia paz y desarrollo

DATOS ECONÓMICOS (2024):
- Gasto militar mundial: $2.7 billones USD/año
  * Estados Unidos: $997 mil millones (37%)
  * China: ~$296 mil millones
  * Rusia: ~$109 mil millones
  * OTAN: $1.506 billones (55%)
- 1% disponible: $27 mil millones/año
- RBU focalizada (700M personas): $38.5/mes ($462/año)

CONTEXTO GEOPOLÍTICO (CRÍTICO):
- USA vs China vs Rusia: Nueva Guerra Fría
- OTAN vs BRICS+: Bloques incompatibles
- Nacionalismos en auge: Anti-globalización
- Consejo Seguridad ONU: Veto de 5 permanentes bloquea reformas

SESGO OCCIDENTAL ESPERADO (Gemini):
- Énfasis en derechos humanos universales
- Redistribución global = imperativo moral
- Subestima preocupaciones de soberanía
- Asume ONU es neutral (ignorando dominación occidental histórica)

SESGO ORIENTAL ESPERADO (DeepSeek):
- Énfasis en soberanía nacional y no-interferencia
- Rechazo a "imposición occidental"
- Prioriza estabilidad > igualdad global
- Desconfianza hacia instituciones dominadas por Occidente

STAKEHOLDERS:
A FAVOR: 700M pobres, ONG, economistas progresistas
EN CONTRA: Lobby militar-industrial, gobiernos autoritarios, conservadores fiscales

DILEMAS ÉTICOS:
- ¿Forzar reducción militar a países en conflicto (Ucrania, Israel, Taiwán)?
- ¿Quién administra fondo? ¿ONU suficientemente neutral?
- ¿RBU crea dependencia o empodera?
- ¿Prioridad: igualdad global o soberanía nacional?

PRECEDENTES:
- Plan Marshall: $150 mil millones (equivalente hoy) reconstruyó Europa
- Alaska Permanent Fund: $1,000-2,000/año desde 1982
- Kenia (GiveDirectly): $22/mes → 42% reducción hambre
- Meta-análisis 2024: RBU reduce pobreza, mejora salud mental

KEYWORDS GEOPOLÍTICOS (Para auto-detection):
military, UN, China, Russia, USA, sovereignty, OTAN, BRICS, redistribution
"""

    case_name = "RBU_ONU_Sigma"

    # ==============================================================================
    # CREAR ORCHESTRATOR Y FORZAR BINAH SIGMA
    # ==============================================================================

    print_section("INICIALIZANDO FRAMEWORK CON BINAH SIGMA FORZADO", "-")
    print("🔧 Reemplazando Binah estándar con BinahSigma...")

    orchestrator = TikunOrchestrator(verbose=True)

    # FORZAR BinahSigma en vez de Binah estándar
    orchestrator.sefirot['binah'] = BinahSigma()
    print("✓ BinahSigma activado manualmente")
    print("✓ Análisis comparativo Occidente (Gemini) vs Oriente (DeepSeek)")
    print()

    # ==============================================================================
    # EJECUTAR PIPELINE
    # ==============================================================================

    print_section("EJECUTANDO PIPELINE TIKUN (10 SEFIROT)", "-")
    print("⚡ Esto tomará ~3-4 minutos (BinahSigma es más lento)...")
    print()

    results = orchestrator.process(scenario, case_name)

    # ==============================================================================
    # EXPORTAR RESULTADOS
    # ==============================================================================

    print_section("EXPORTANDO RESULTADOS", "-")

    json_file = orchestrator.export_results(results, format="json")
    txt_file = orchestrator.export_results(results, format="txt")

    print(f"✓ JSON exportado: {json_file}")
    print(f"✓ TXT exportado:  {txt_file}")

    # ==============================================================================
    # RESUMEN EJECUTIVO
    # ==============================================================================

    print_section("RESUMEN EJECUTIVO", "=")

    sefirot_results = results['sefirot_results']
    metrics = results['pipeline_metrics']

    # Keter
    if 'keter' in sefirot_results and 'error' not in sefirot_results['keter']:
        keter = sefirot_results['keter']
        print("🔵 KETER (Validación Ética):")
        print(f"   Alignment Score: {keter['alignment_percentage']}%")
        print(f"   Status: {'✓ PASÓ' if keter['threshold_met'] else '✗ NO PASÓ'}")
        print(f"   Corruption Severity: {keter['corruption_severity']}")
        print()

        print("   Scores por dimensión:")
        for dim, score in keter['scores'].items():
            print(f"     • {dim}: {score:+d}/10")
        print()

    # BinahSigma - ANÁLISIS DETALLADO
    if 'binah' in sefirot_results and 'error' not in sefirot_results['binah']:
        binah = sefirot_results['binah']
        print("🔵 BINAH SIGMA (Análisis Multi-Civilizacional):")
        print(f"   Mode: {binah.get('mode', 'simple')}")
        print(f"   Contextual Depth: {binah.get('contextual_depth_score', 'N/A')}%")
        print()

        if binah.get('mode') == 'sigma':
            print("   🌍 ANÁLISIS COMPARATIVO OCCIDENTE vs ORIENTE:")
            print(f"   Bias Delta: {binah.get('bias_delta', 'N/A')}% (divergencia entre perspectivas)")
            print(f"   Divergence Level: {binah.get('divergence_level', 'N/A')}")
            print(f"   Blind Spots Detected: {binah.get('blind_spots_detected', 0)}")
            print(f"   Convergence Points: {binah.get('convergence_points', 0)}")
            print()

            if 'sigma_synthesis' in binah:
                sigma = binah['sigma_synthesis']

                print("   📊 SESGOS CIEGOS OCCIDENTALES (lo que Occidente NO ve):")
                west_blinds = sigma.get('west_blind_spots', [])
                if west_blinds:
                    for i, blind_spot in enumerate(west_blinds[:4], 1):
                        print(f"     {i}. {blind_spot}")
                else:
                    print("     (No detectados)")
                print()

                print("   📊 SESGOS CIEGOS ORIENTALES (lo que Oriente NO ve):")
                east_blinds = sigma.get('east_blind_spots', [])
                if east_blinds:
                    for i, blind_spot in enumerate(east_blinds[:4], 1):
                        print(f"     {i}. {blind_spot}")
                else:
                    print("     (No detectados)")
                print()

                print("   🤝 CONVERGENCIA UNIVERSAL (acuerdos entre ambos):")
                convergence = sigma.get('universal_convergence', [])
                if convergence:
                    for i, point in enumerate(convergence[:4], 1):
                        print(f"     {i}. {point}")
                else:
                    print("     (No detectados)")
                print()

                print("   🔄 SÍNTESIS TRANSCENDENTAL:")
                synthesis = sigma.get('transcendent_synthesis', '')
                if synthesis:
                    # Wrap text at 90 chars
                    words = synthesis.split()
                    line = "     "
                    for word in words:
                        if len(line) + len(word) + 1 > 90:
                            print(line)
                            line = "     " + word
                        else:
                            line += " " + word if line != "     " else word
                    if line != "     ":
                        print(line)
                else:
                    print("     (No generada)")
                print()
        else:
            print("   ⚠️  WARNING: BinahSigma NO ejecutó en modo Sigma")
            print("   Posible causa: Auto-detection falló o DeepSeek API no disponible")
            print()

    # Tiferet
    if 'tiferet' in sefirot_results and 'error' not in sefirot_results['tiferet']:
        tiferet = sefirot_results['tiferet']
        print("🔵 TIFERET (Síntesis Chesed-Gevurah):")
        print(f"   Harmony Score: {tiferet.get('harmony_score', 'N/A')}%")
        print(f"   Balance Ratio: {tiferet.get('balance_ratio', 'N/A')}")
        print(f"   Synthesis Quality: {tiferet.get('synthesis_quality', 'N/A')}")
        print()

    # Yesod
    if 'yesod' in sefirot_results and 'error' not in sefirot_results['yesod']:
        yesod = sefirot_results['yesod']
        print("🔵 YESOD (Integración):")
        print(f"   Integration Score: {yesod.get('integration_score', 'N/A')}%")
        recommendation = yesod.get('recommendation', {})
        print(f"   Recommendation: {recommendation.get('decision', 'N/A')}")
        print()

    # Malchut
    if 'malchut' in sefirot_results and 'error' not in sefirot_results['malchut']:
        malchut = sefirot_results['malchut']
        print("🔵 MALCHUT (Plan de Acción):")
        print(f"   Manifestation Score: {malchut.get('manifestation_score', 'N/A')}%")
        go_decision = malchut.get('go_no_go_decision', {})
        print(f"   GO/NO-GO: {go_decision.get('decision', 'N/A')}")
        print()

    # Pipeline Metrics
    print_section("MÉTRICAS DEL PIPELINE", "-")
    print(f"✓ Sefirot ejecutadas: {metrics['successful_sefirot']}/{metrics['total_sefirot']}")
    print(f"✓ Success rate: {metrics['success_rate']}%")
    print(f"✓ Duración total: {metrics['total_duration_seconds']}s (~{metrics['total_duration_seconds']/60:.1f} min)")
    print(f"✓ Pipeline quality: {metrics['pipeline_quality']}")
    print(f"✓ Average score: {metrics['average_score']}")

    # Datos económicos
    print_section("ANÁLISIS ECONÓMICO", "-")
    print("💰 FONDOS: $27 mil millones/año (1% gasto militar global)")
    print("👥 BENEFICIARIOS: 700 millones en pobreza extrema")
    print("💵 RBU: $38.50/mes ($462/año) → +18% ingreso anual")

    # ==============================================================================
    # CONCLUSIÓN
    # ==============================================================================

    print_section("ANÁLISIS COMPLETADO", "=")
    print("📊 Resultados exportados:")
    print(f"   - {json_file}")
    print(f"   - {txt_file}")
    print()
    print("🔍 Análisis clave:")
    print("   1. Comparar bias_delta con otros casos geopolíticos")
    print("   2. Identificar blind spots que ningún modelo detectaría solo")
    print("   3. Evaluar si síntesis transcendental ofrece nuevo insight")
    print("   4. Contrastar con test_rbu_onu_modern.py (sin BinahSigma)")
    print()

    return results


if __name__ == "__main__":
    try:
        results = main()
        sys.exit(0)
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrumpido por usuario")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
