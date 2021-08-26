import { PopupWindow } from "./PopupWindow.js";
import { EditorElementParser } from "../EditorElements/EditorElementParser.js"
import { EditorElementTypes } from "../EditorElements/EditorElement.js"
import { assert } from "../../Utils/Assert.js";
import { AliasedGrammarSymbol, GrammarSymbol } from "../../language.js";
import { Group } from "../EditorElements/Group.js";
import { ContainerResizer } from "../../Utils/ContainerResizer.js";

export class GenerationPathPopup extends PopupWindow {
    
    code;

    $generationPath;
    $generationContentContainer;
    
    $treeView;
    $treeViewContainer;

    $selectedElemViews = [];

    constructor($container, code) {
        super($container, 'Generation path');
        
        this.InitCode(code);
    }

    LinkGeneratedBySequence(elem){
        for (let i = elem; i; i = i.GetGeneratedBy()){
            let generatedBy = i.GetGeneratedBy()
            if (generatedBy) 
                generatedBy.next = i;
        }
    }

    GetGenerationSequence_ByGeneratedBy(elem){
        let generatedBys = [];
        for (let i = elem; i; i = i.GetGeneratedBy()){
            generatedBys.unshift(i);
        }
        return generatedBys;
    }

    InitCode(code){
        let theme = elem => code.theme(elem);

        this.code = EditorElementParser.FromJson( code.ToJsonRec(), (elem) => {
            elem.SetTheme(elem => theme(elem));

            if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup){
                elem.SetOnRenderElem(elem =>
                    elem.views ? elem.views.push(elem.GetCustomizableView()) : elem.views = [elem.GetCustomizableView()]
                );
                elem.SetAutoRendering(false);

                let i = 0;
                while (i < elem.GetLength()){
                    if (elem.GetElem(i).GetType() === EditorElementTypes.InvisibleBlock){
                        elem.RemoveElemAt(i);
                        continue;    
                    }else
                        ++i;
                }
            }
            else if (elem.GetType() === EditorElementTypes.InputBlock || elem.GetType() === EditorElementTypes.SelectionBlock){
                elem.SetEditable(false);
            }
        });

        let startingSymbol = new AliasedGrammarSymbol(new GrammarSymbol('Generation Path', false));
        this.code = new Group( startingSymbol, [this.code] ), this.code.SetAutoRendering(false);
        this.code.SetOnRenderElem(elem =>
            elem.views ? elem.views.push(elem.GetCustomizableView()) : elem.views = [elem.GetCustomizableView()]
        );

        // link so that elem.GetGeneratedBy().next == elem
        this.code.ForEachRec( (elem) => this.LinkGeneratedBySequence(elem) );

        // each group handles the child nodes so that they are in their starting state (i.e. for_stmt becomes stmt)
        this.code.ForEachRec( undefined , (elem) => { //postorder traversal
            if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup){
                elem.ForEach((childElem) => {
                    for (var root = childElem; root.GetGeneratedBy(); root = root.GetGeneratedBy());

                    if (root != childElem)  elem.ReplaceElem(childElem, root);
                });
            }
        });
    }

    RenderSeparator(){
        this.$generationPath.append($('<div/>').addClass('next'));
    }

    RenderIfSelectionBlock(elem){
        if (elem.GetType() === EditorElementTypes.SelectionBlock && elem.GetSelectedSymbol()){
            let elemWithSelections = elem.Clone();
            let parent = elem.GetParent();
            
            parent.ReplaceElem(elem, elemWithSelections);
            
            this.RenderSeparator();
            this.code.Render(this.$generationPath);
            
            elemWithSelections.GetWholeView().find('.block-alternate-selections').css(
                {
                    display: 'flex',
                    position: 'unset'
                }
            );
            elem.views.push(elemWithSelections.GetCustomizableView());

            parent.ReplaceElem(elemWithSelections, elem);
        }
    }

    RenderGenerationPathFromBlock(elem){
        this.RenderIfSelectionBlock(elem);
        
        let parent = elem.GetParent();

        for (var prev = elem, curr = elem.next; curr; prev = curr, curr = curr.next){
            parent.ReplaceElem(prev, curr);
            
            this.RenderSeparator();
            this.code.Render(this.$generationPath);
            
            this.RenderIfSelectionBlock(curr);
        }
    }

    CreateTreeNode(icon, name, childno){
        let $node = $('<div/>').addClass('node');

        let $info = $('<div/>').addClass('info');

        let $wholeRow = $('<div/>').addClass('whole-row');
        let $icon = $('<div/>').addClass('icon');
        let $name = $('<div/>').addClass('name').text(name);
        let $children = $('<div/>').addClass('children');
        
        $info.append($wholeRow, $icon, $name);
        
        if (childno > 1){
            let $childno = $('<div/>').addClass('childno').text(childno);
            $info.append($childno);
        }

        if (icon){
            $icon.addClass(icon);
        }

        $node.append($info, $children);

        $info.on('dblclick', (e) => {
            if (!$children.is(':empty')){
                $children.is(':visible') ? 
                    $icon.css('transform', 'rotateZ(-90deg)') :
                    $icon.css('transform', 'none');
                
                $children.toggle();;
            }
        });

        return $node;
    }

    CreateTreeNodeFromBlock(elem) {
        let numChildren = 
            ( elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup ) &&
            elem.GetElems().reduce( 
                (sum, elem) => sum + !!(
                    elem.GetType() != EditorElementTypes.NewLine && elem.GetType() != EditorElementTypes.Tab
                ),
                0
            );

        let iconClass = numChildren > 0 || elem.next ? 'arrow' : 'block';

        let name = elem.GetSymbol().alias || elem.GetSymbol().symbol.name;
        
        let $node = this.CreateTreeNode(iconClass, name, numChildren);

        $node.children('.info').on('click', () => {
            this.$selectedElemViews.forEach($view => {
                $view.removeClass('selected');
            });

            this.$selectedElemViews = [];

            for (var generatedBy = elem; generatedBy.GetGeneratedBy(); generatedBy = generatedBy.GetGeneratedBy());

            for (let elem = generatedBy; elem; elem = elem.next){
                elem.views.forEach($view => {
                    this.$selectedElemViews.push($view);
                    $view.addClass('selected');
                });
            }
        });

        return $node;
    }

    CreateAllTreeNodesFromBlock(elem){        
        let $nodes = [], $node;

        for (let generatedBy of this.GetGenerationSequence_ByGeneratedBy(elem)){
            $node = this.CreateTreeNodeFromBlock(generatedBy);
            
            if ($nodes.length)
                $nodes[$nodes.length - 1].children('.children').append($node);

            $nodes.push($node);
        }
        
        return $nodes;
    }

    RenderAll(){
        this.code.Render(this.$generationPath);

        let treePoints = [this.$treeView];

        this.code.ForEachRec(
            elem => {
                if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup)
                    elem.ForEach( childElem => this.RenderGenerationPathFromBlock(childElem) );

                let $nodes, $insertionPoint;

                if (elem.GetType() !== EditorElementTypes.Tab && elem.GetType() !== EditorElementTypes.NewLine){
                    $nodes              = this.CreateAllTreeNodesFromBlock(elem);
                    $insertionPoint     = treePoints[treePoints.length - 1];

                    $insertionPoint.append($nodes[0]);
                }

                if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup)
                    treePoints.push($nodes[$nodes.length - 1].children('.children'));
            },
            elem => {
                if (elem.GetType() === EditorElementTypes.Group || elem.GetType() === EditorElementTypes.RepetitionGroup)
                    treePoints.pop();
            }
        );
    }

    Render_(){
        this.$generationContentContainer = $('<div/>').addClass('generation-content-container');
        
        this.$generationPath = $('<div/>').addClass('generation-path');
        
        this.$treeView = $('<div/>').addClass('tree-view');

        this.$treeViewContainer = $('<div/>').addClass('tree-view-container').append(this.$treeView);
        this.$generationPathContainer = $('<div/>').addClass('generation-path-container').append(this.$generationPath);

        this.$generationContentContainer.append(this.$treeViewContainer, this.$generationPathContainer);

        this.$content.append(this.$generationContentContainer);

        this.RenderAll();
    
        let cr = new ContainerResizer(this.$treeViewContainer);
        cr.InitializeToFixedWidth();
        cr.MakeResizable();
    }

}