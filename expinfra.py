from IPython.display import display
import ipywidgets as widgets
from datetime import datetime

EXP_STATE = {}


def experiment_start(name):
    btn = widgets.Button(description='Start {}'.format(name))

    def on_click(_):
        btn.disabled = True
        btn.description = '{} started'.format(name)
        EXP_STATE[name] = {'start': datetime.now()}

    btn.on_click(on_click)
    display(btn)


def experiment_end(name):
    btn = widgets.Button(description='End {}'.format(name))

    def on_click(_):
        btn.disabled = True
        btn.description = '{} ended'.format(name)
        EXP_STATE[name]['end'] = datetime.now()

    btn.on_click(on_click)
    display(btn)