# Monta verificacao-diretrizes.md a partir de resultados/<tema>.json e resultados/<tema>-verificado.json
import json, glob, os, re, sys
DIR = os.path.dirname(os.path.abspath(__file__))
HOJE = '2026-10-31'
def esc(t):
    return re.sub(r'\s+', ' ', str(t or '')).replace('|', '/').strip()
temas = sorted(f for f in glob.glob(os.path.join(DIR, 'resultados', '*.json')) if not f.endswith('-verificado.json'))
linhas = ['# Verificação de diretrizes — avaliação clínica de 31/10/2026', '',
          'Método da skill checar-diretriz: pesquisador abre a fonte primária; verificador adversarial reabre cada link e emite Confirmado / Mudou / Não achei. Sem dado de paciente.', '',
          f'Conferido em {HOJE}.', '']
tot = {'Confirmado': 0, 'Mudou': 0, 'Não achei': 0, 'pendente': 0}
for ft in temas:
    d = json.load(open(ft, encoding='utf-8'))
    fv = ft[:-5] + '-verificado.json'
    v = json.load(open(fv, encoding='utf-8')) if os.path.exists(fv) else None
    vmap = {}
    if v:
        for x in v['verificacoes']:
            vmap[esc(x['afirmacao'])[:80]] = x
    linhas += [f"## {d['tema']}", '', '| Afirmação | Veredito | Sociedade e título | Ano | Link | Seção ou tabela | Observação |', '|---|---|---|---|---|---|---|']
    for c in d['claims']:
        key = esc(c['afirmacao'])[:80]
        vx = vmap.get(key)
        if vx is None and v:
            # casamento aproximado: maior prefixo comum
            best = max(v['verificacoes'], key=lambda x: len(os.path.commonprefix([esc(x['afirmacao']), esc(c['afirmacao'])])), default=None)
            if best and len(os.path.commonprefix([esc(best['afirmacao']), esc(c['afirmacao'])])) > 40:
                vx = best
        ver = vx['veredito'] if vx else 'pendente'
        tot[ver] = tot.get(ver, 0) + 1
        obs = esc(c.get('observacao', ''))
        if vx and vx.get('observacao'):
            obs = (obs + ' · Verificador: ' + esc(vx['observacao'])).strip(' ·')
        linhas.append(f"| {esc(c['afirmacao'])} | {ver} | {esc(c['sociedade'])} — {esc(c['titulo'])} | {esc(c['ano'])} | {esc(c['link'])} | {esc(c['secao'])} | {obs} |")
    linhas += ['', f"**Edição vigente conferida:** {esc(d.get('edicao_mais_recente_confirmada',''))}", '']
    if d.get('lacunas'):
        linhas += [f"**Lacunas do pesquisador:** {esc(d['lacunas'])}", '']
    if v:
        if v.get('atualizacoes_encontradas'): linhas += [f"**Atualizações achadas pelo verificador:** {esc(v['atualizacoes_encontradas'])}", '']
        if v.get('erros_na_aplicacao_ao_caso'): linhas += [f"**Erros apontados na aplicação ao caso:** {esc(v['erros_na_aplicacao_ao_caso'])}", '']
        if v.get('acrescimos'): linhas += [f"**Acréscimos do verificador:** {esc(v['acrescimos'])}", '']
    else:
        linhas += ['_Verificação ainda não gravada para este tema._', '']
linhas += ['---', '', 'Totais: ' + ', '.join(f'{k} {v}' for k, v in tot.items() if v), '']
open(os.path.join(DIR, 'verificacao-diretrizes.md'), 'w', encoding='utf-8').write('\n'.join(linhas))
print('verificacao-diretrizes.md:', len(temas), 'temas;', tot)
